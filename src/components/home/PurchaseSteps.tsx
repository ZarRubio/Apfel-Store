import { Reveal } from '@/components/animations/Reveal';
import Link from 'next/link';
import { SmartphoneIcon, TruckIcon } from '@/components/icons/UiIcons';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const steps = [
  { number: '01', title: 'Elige tu iPhone', text: 'Explora los modelos y selecciona el color y la capacidad que prefieras.', icon: SmartphoneIcon },
  { number: '02', title: 'Escríbenos', text: 'Confirma el precio y la disponibilidad, y resuelve tus dudas por WhatsApp.', icon: WhatsAppIcon },
  { number: '03', title: 'Coordina la entrega', text: 'Acuerda el pago y la entrega según tu ubicación.', icon: TruckIcon },
];

export function PurchaseSteps() {
  return <section id="como-comprar" className="steps-section section container"><Reveal><div className="steps-intro"><div><span className="eyebrow">CÓMO COMPRAR</span><h2>Tu próximo iPhone, en tres pasos.</h2></div><p>Te acompañamos desde que eliges tu equipo hasta que coordinas la entrega.</p></div></Reveal><div className="steps-grid">{steps.map(({ number, title, text, icon: Icon }, index) => <Reveal key={number} delay={index * .07}><article className="step"><div className="step-top"><span className="step-icon"><Icon /></span><span className="step-number">{number}</span></div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div><div className="steps-actions"><Link className="button button-dark" href="/productos">Explorar iPhone <span aria-hidden="true">→</span></Link><a className="text-link" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Hablar con un asesor <span aria-hidden="true">↗</span></a></div></section>;
}
