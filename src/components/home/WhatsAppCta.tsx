import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function WhatsAppCta() { return <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">¿NO SABES CUÁL ELEGIR?</span><h2>Lo encontramos<br /><em>contigo.</em></h2></div><a className="button button-light" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Hablar con un asesor <span aria-hidden="true">↗</span></a></div></section>; }
