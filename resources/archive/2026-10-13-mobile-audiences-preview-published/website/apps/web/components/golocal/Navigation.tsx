"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
const links = [["/#customers", "For customers"], ["/businesses", "For businesses"], ["/#how-it-works", "How GoLocal works"], ["/#partners", "For partners"]];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="gl-header"><a className="gl-skip" href="#main">Skip to content</a><div className="gl-container gl-nav"><Logo /><nav aria-label="Main navigation" className="gl-desktop-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><Link className="gl-button gl-button-small gl-nav-cta" href="/pilot">Join the pilot <span aria-hidden="true">↗</span></Link><button className="gl-menu-button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button></div>{open && <nav id="mobile-nav" className="gl-mobile-nav" aria-label="Mobile navigation">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/pilot" onClick={() => setOpen(false)}>Join the pilot ↗</Link></nav>}</header>;
}
