import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { AdvisorCard } from '@/components/shared/AdvisorCard';

export const metadata: Metadata = { title: 'Accesorios', description: 'Conoce los accesorios y la promoción de Apfel Store.' };

const accessories = [
  { name: 'Cubo 20 W', price: 40, image: 'cargador-20w.webp' },
  { name: 'Cubo 40 W', price: 70, image: 'cargador-40w.png' },
  { name: 'Cable USB-C', price: 40, image: 'usb-c.webp' },
  { name: 'Cable Lightning', price: 30, image: 'lightning.jpg' },
  { name: 'Protector de cámara', price: 10, image: 'protector-camara.jpg' },
  { name: 'Protector de pantalla', price: 10, image: 'protector-pantalla.jpg' },
  { name: 'Case Space', price: 20, image: 'case-space.webp' },
  { name: 'Case MagSafe', price: 30, image: 'referencia.avif' },
  { name: 'Case color entero', price: 30, image: 'case-color.jpg' },
  { name: 'EarPods', price: 50, image: 'earpods.jpg' },
  { name: 'AirPods', price: 120, image: 'airpods.jpg' },
];

export default function AccessoriesPage() {
  const url = getWhatsAppUrl({ message: 'Hola Apfel Store, quisiera conocer los 7 accesorios gratis incluidos con la compra de un iPhone.' });
  return <main id="main-content" tabIndex={-1}>
    <section className="container accessories-hero">
      <div><span className="eyebrow">ACCESORIOS APFEL STORE</span><h1>Más para tu iPhone.</h1><p>Por la compra de un iPhone llevas <strong>7 accesorios gratis.</strong></p><p className="accessories-note">Consulta con un asesor cuáles están incluidos y coordina tu compra por WhatsApp.</p><div className="accessories-actions"><a className="button button-dark" href={url} target="_blank" rel="noreferrer"><WhatsAppIcon /> Consultar accesorios <span aria-hidden="true">↗</span></a><Link className="text-link" href="/productos">Ver iPhone →</Link></div></div>
      <div className="accessories-image accessories-hero-photo" style={{ width: 'min(100%, 480px)', height: 'auto', justifySelf: 'center' }}><Image src="/accessories/promocion-7-accesorios.png" alt="Promoción: por la compra de un iPhone, siete accesorios gratis" width={1122} height={1402} sizes="(max-width: 700px) 90vw, 480px" style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain', padding: 0, mixBlendMode: 'normal', filter: 'grayscale(1) contrast(1.04)' }} priority /></div>
    </section>
    <section className="container accessories-catalog section" aria-labelledby="accessories-title">
      <div className="accessories-catalog-heading"><div><span className="eyebrow">PARA TU DÍA A DÍA</span><h2 id="accessories-title">Encuentra tus accesorios.</h2></div><p>Consulta disponibilidad y compatibilidad con tu modelo antes de comprar.</p></div>
      <div className="accessories-grid">{accessories.map((item) => {
        const itemUrl = getWhatsAppUrl({ message: `Hola Apfel Store, quisiera consultar por ${item.name} (S/ ${item.price}) y su disponibilidad.` });
        return <article className="accessory-card" key={item.name}>
          <div className="accessory-card-image">{item.image ? <Image src={`/accessories/${item.image}`} alt={item.name} fill sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw" /> : <span>Imagen por confirmar</span>}</div>
          <div className="accessory-card-body"><h3>{item.name}</h3><strong>S/ {item.price}</strong><a href={itemUrl} target="_blank" rel="noreferrer" aria-label={`Consultar ${item.name} por WhatsApp`}>Consultar por WhatsApp <span aria-hidden="true">↗</span></a></div>
        </article>;
      })}</div>
      <p className="accessories-disclaimer">Las imágenes son referenciales. Consulta por WhatsApp qué accesorios incluye la promoción de tu iPhone.</p>
      <div className="advisor-spaced"><AdvisorCard eyebrow="ACCESORIOS PARA TU EQUIPO" title="¿Dudas sobre un accesorio?" description="Te ayudamos a consultar la compatibilidad con tu equipo." href={getWhatsAppUrl({ message: 'Hola Apfel Store, quisiera consultar por un accesorio y su compatibilidad con mi iPhone.' })} label="Consultar un accesorio" /></div>
    </section>
  </main>;
}
