import Link from 'next/link';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="wordmark footer-wordmark" href="/"><Image className="wordmark-mark" src="/images/brand/apfel-logo.jpg" alt="" width={42} height={42} /><span>Apfel <b>STORE</b></span></Link><p className="muted">Tu próximo iPhone comienza aquí.</p></div><div><p className="footer-label">Explora</p><Link href="/productos">Todos los iPhone</Link><Link href="/ofertas">Ofertas</Link><Link href="/blog">Blog</Link></div><div><p className="footer-label">Conversemos</p><a data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">WhatsApp ↗</a><Link href="/contacto">Contacto</Link><span className="muted">Lima, Perú</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Apfel Store</span><span>Precios de referencia en soles.</span></div></footer>;
}
