import { betterAuth } from 'better-auth';
import { verifyGoogleIdToken } from 'better-auth/social-providers';
import { magicLink } from 'better-auth/plugins/magic-link';
import { getMigrations } from 'better-auth/db/migration';
import Database from 'better-sqlite3';
import { chmod } from 'node:fs/promises';
import { join } from 'node:path';
import { sendPilotEmail } from './pilot-email.js';

// Better Auth owns email verification, single-use links, sessions and auth rate limits.
// This database stays private on the same durable disk as the encrypted business store.
export async function createAccounts(config, sendOverride, existingUsers = {}) {
  const filename = join(config.dataDir, 'assisted-accounts.sqlite');
  const database = new Database(filename);
  await chmod(filename, 0o600);
  const devMail = new Map();
  const send = async ({email, url}) => {
    if (sendOverride) return sendOverride({email,url});
    if (config.accounts.devMailbox) {
      if (devMail.size > 100) devMail.clear();
      devMail.set(email, {email,url,createdAt:Date.now()}); return;
    }
    if(config.accounts.emailRelay)return sendPilotEmail(config,{type:'sign_in',email,url});
    const result = await fetch('https://api.resend.com/emails', { method:'POST', redirect:'error', signal:AbortSignal.timeout(15000),
      headers:{Authorization:`Bearer ${config.accounts.emailKey}`, 'Content-Type':'application/json'},
      body:JSON.stringify({from:config.accounts.emailFrom,to:[email],...(config.accounts.emailReplyTo?{reply_to:config.accounts.emailReplyTo}:{}),subject:'Your GoLocal sign-in link',
        text:`Sign in to GoLocal using this single-use link, valid for 15 minutes:\n${url}\n\nIf you did not request it, ignore this email.`}) });
    if (!result.ok) throw new Error('Account email delivery failed. No automatic resend.');
  };
  const options = {
    appName:'GoLocal', baseURL:config.baseUrl, basePath:'/account', secret:config.accounts.secret, database,
    trustedOrigins:[config.baseUrl], telemetry:{enabled:false}, logger:{disabled:true},
    rateLimit:{enabled:true,storage:'database'},
    session:{expiresIn:7*86400,updateAge:86400},
    // Only verified email matches may link to a verified existing account.
    account:{encryptOAuthTokens:true,accountLinking:{enabled:true,trustedProviders:[],allowDifferentEmails:false}},
    ...(config.accounts.google?.enabled?{socialProviders:{google:{
      clientId:config.accounts.google.clientId,clientSecret:config.accounts.google.clientSecret,
      prompt:'select_account',accessType:'online',includeGrantedScopes:false,
      disableIdTokenSignIn:true,
      // Verify claims from the server-side code exchange before creating/linking an account.
      getUserInfo:async tokens=>{
        if(!tokens.idToken)return null;
        const profile=await verifyGoogleIdToken({token:tokens.idToken,audience:config.accounts.google.clientId});
        if(!profile||profile.email_verified!==true||typeof profile.sub!=='string'||typeof profile.email!=='string')return null;
        return {user:{name:profile.name||'',email:profile.email,image:profile.picture,emailVerified:true},data:profile};
      },
    }}}:{}),
    plugins:[magicLink({expiresIn:900,storeToken:'hashed',sendMagicLink:send})],
  };
  try {
    const migrations = await getMigrations(options); await migrations.runMigrations();
    for(const user of Object.values(existingUsers)) {
      const account=database.prepare('SELECT id,email FROM user WHERE id = ?').get(user.id);
      if(!account||account.email.toLowerCase()!==user.email)throw new Error('Account database does not match assisted business history. Restore the matching backup.');
    }
    const auth = betterAuth(options);
    return { auth, devMail, close:() => database.close() };
  } catch(e) { database.close(); throw e; }
}
