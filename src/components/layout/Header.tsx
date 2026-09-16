'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { navigation } from '@/data/navigation';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`) || (href === '/productos' && pathname.startsWith('/iphone/'));

  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); }
  }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <div className="container nav-inner">
      <Link className="wordmark header-wordmark" href="/" aria-label="Apfel Store, inicio" onClick={() => setOpen(false)}><Image className="wordmark-mark" src="/images/brand/apfel-logo.jpg" alt="" width={52} height={52} /><span>Apfel <b>STORE</b></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="nav-actions"><a className="whatsapp-link" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a><button ref={menuRef} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button></div>
    </div>
    <nav id="mobile-navigation" hidden={!open} className="mobile-nav" aria-label="Navegación móvil">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link>)}</nav>
  </header>;
}
