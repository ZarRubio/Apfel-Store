import { getWhatsAppUrl } from '@/lib/whatsapp';

export function ContactBand() {
  return <section className="contact-band"><div><span className="eyebrow">¿AÚN NO SABES CUÁL ELEGIR?</span><h2>Lo encontramos contigo.</h2><p>Cuéntanos qué buscas y te ayudamos a elegir tu próximo iPhone.</p></div><a className="button button-light" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Hablar con un asesor <span>↗</span></a></section>;
}
