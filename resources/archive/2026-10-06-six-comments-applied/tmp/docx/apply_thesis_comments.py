from pathlib import Path
import re,hashlib
from docx import Document
from docx.text.paragraph import Paragraph
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.shared import Pt
root=Path('/Users/pulkitwalia/Documents/ChatGPT/Homebase')
path=root/'output/docx/homebase-business-thesis.docx'
archive=root/'resources/archive/2026-10-06-before-six-comments'
archive.mkdir(exist_ok=False)
for name in ['output/docx/homebase-business-thesis.docx','resources/business-thesis.md','resources/research-index.md','resources/archive/README.md']:
    src=root/name;dest=archive/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(src.read_bytes())
(archive/'SNAPSHOT.md').write_text('# Before six annotation edits\n\nOctober 6 2026. Exact draft before the user comments on shared supply, business authorization, plugin setup and distribution.\n')
doc=Document(path)
mdpath=root/'resources/business-thesis.md';md=mdpath.read_text()
replacements=[
('We organize the supply once and make it available to multiple agents. Each agent company then has less supplier recruitment, integration and coordination to handle itself. Businesses keep their existing software and authorize Homebase to arrange bookings.',
'**Agents get immediate access to participating local businesses through one connection:** discover and filter providers, book a service and manage the booking. Each agent company has less supplier recruitment, integration and coordination to handle itself.\n\n**Businesses connect once to reach all personal agents connected to Homebase.** For supported software, connecting can be as simple as approving an OAuth request through its app marketplace.[5] Other systems need manual credentials or a custom connection, which we will simplify. We agree with each business what services can be booked.'),
('Plugin ecosystems in ChatGPT and Claude already provide routes for adding custom connectors.[3, 4] Our intended experience is simple: “Add Homebase so you can book a cleaner for me.” Setup and authorization vary by platform; a single prompt will not complete every connection.',
'Platforms such as ChatGPT and Claude already have app marketplaces and custom-connector paths.[3, 4] On supported agents, adding Homebase could be as simple as asking, **“Add the Homebase plugin for me,”** then approving access. Platforms without a suitable plugin route may require a custom integration with the agent company.'),
('**A built-in partnership** can bring requests through an agent’s existing booking flow, without users having to discover Homebase separately. We need an agreement on which relevant requests the partner routes to us; integration alone does not guarantee traffic.',
'**A direct partnership with a personal-agent company** would make Homebase part of that agent’s booking flow. The company routes relevant requests to us, so users do not need to find and add our plugin themselves. We agree with the partner which services, locations and requests it will route to Homebase.'),
('**A user-added connector** makes customer distribution our responsibility. We need to reach users, give them a reason to add Homebase and help them complete setup. Directories can help people discover us. Niche marketing can reach users around a specific need. These routes remain open for discussion.',
'**Marketplace distribution** lets users add Homebase to the agent they already use. This is an established route for third-party plugins. We need to win the first users through directory discovery or niche marketing. As successful bookings build a track record, we can use that evidence to seek wider recommendations from users and agent platforms. These routes remain open for discussion.')]

def plain(t):return t.replace('**','')
def fill(p,text):
    p.clear()
    for i,t in enumerate(re.split(r'\*\*(.*?)\*\*',text)):
        r=p.add_run(t)
        if i%2:r.bold=True
for old,new in replacements:
    matches=[p for p in doc.paragraphs if p.text==plain(old)]
    assert len(matches)==1,(old,len(matches))
    p=matches[0];parts=new.split('\n\n');fill(p,parts[0])
    for extra in parts[1:]:
        el=OxmlElement('w:p');p._p.addnext(el);newp=Paragraph(el,p._parent);newp.style=p.style;fill(newp,extra);p=newp
    assert md.count(old)==1,old
    md=md.replace(old,new)
# Keep source 3 aligned with the marketplace and connection claim.
old_url='https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt'
new_url='https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt'
for rel in doc.part.rels.values():
    if rel.reltype==RT.HYPERLINK and rel.target_ref==old_url:rel._target=new_url
for t in doc.element.xpath('.//w:hyperlink//w:t'):
    if t.text=='[3] ChatGPT custom MCP apps':t.text='[3] ChatGPT connected apps'
md=md.replace('[ChatGPT custom MCP apps]('+old_url+')','[ChatGPT connected apps]('+new_url+')')
p=doc.paragraphs[-1];p.add_run('  •  ').font.size=Pt(8.5)
h=OxmlElement('w:hyperlink');h.set(qn('r:id'),p.part.relate_to('https://developer.getjobber.com/docs/getting_started/',RT.HYPERLINK,is_external=True))
r=OxmlElement('w:r');rp=OxmlElement('w:rPr');color=OxmlElement('w:color');color.set(qn('w:val'),'176B70');rp.append(color);sz=OxmlElement('w:sz');sz.set(qn('w:val'),'17');rp.append(sz);r.append(rp);t=OxmlElement('w:t');t.text='[5] Jobber authorization';r.append(t);h.append(r);p._p.append(h)
md+='- [5] [Jobber authorization](https://developer.getjobber.com/docs/getting_started/)\n'
doc.save(path);mdpath.write_text(md)
print('Applied all six comments in four passages; added merchant authorization source.')
print('Words:',len(' '.join(p.text for p in doc.paragraphs).split()))
