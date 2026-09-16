import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { Reveal } from '@/components/animations/Reveal';

export function ContactBand() {
  return <section className="contact-band"><Reveal className="contact-band-inner"><div><span className="eyebrow">¿AÚN NO SABES CUÁL ELEGIR?</span><h2>Lo encontramos contigo.</h2><p>Cuéntanos qué buscas y te ayudamos a elegir tu próximo iPhone.</p></div><a className="button button-light" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Hablar con un asesor <span aria-hidden="true">↗</span></a></Reveal></section>;
}
