import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/animations/Reveal';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export function EditorialShowcase() {
  return <section className="editorial-section section container"><Reveal className="editorial-reveal"><div className="editorial-card"><div className="editorial-copy"><span className="eyebrow">ENCUENTRA TU VERSIÓN</span><h2>Un iPhone.<br /><em>Muchas posibilidades.</em></h2><p>Color, capacidad y modelo.<br />Elige los detalles que hacen que sea tuyo.</p><Link className="button button-dark" href="/iphone/iphone-17">Descubre iPhone 17 <span><ChevronRightIcon /></span></Link></div><div className="editorial-image"><span className="editorial-orbit" aria-hidden="true" /><Image src="/images/products/17-lavender.webp" alt="iPhone 17 en lavanda" width={400} height={417} loading="lazy" /></div></div></Reveal></section>;
}
