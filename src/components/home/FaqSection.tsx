import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { Reveal } from '@/components/animations/Reveal';

const faqs = [
  ['¿Cómo compro un iPhone?', 'Abre el modelo que te interesa, elige color y capacidad y consulta por WhatsApp. Antes de confirmar, un asesor revisará contigo el precio final, la disponibilidad, el estado del equipo y las condiciones de pago y entrega.'],
  ['¿El precio y la disponibilidad están actualizados?', 'Los precios publicados son referenciales y pueden cambiar según el modelo y la configuración. Confirma por WhatsApp el precio final, la capacidad y el color disponibles antes de realizar el pago.'],
  ['¿Qué diferencia hay entre un equipo sellado y uno de exhibición?', 'Un equipo sellado no ha sido abierto. Uno de exhibición pudo estar expuesto o usarse para demostración. Antes de comprar, pide fotos de la unidad y confirma su estado, batería, accesorios y garantía.'],
  ['¿Puedo comprar desde otra ciudad?', 'Sí, coordinamos envíos fuera de Lima. Comparte tu ciudad o distrito para que el asesor confirme si hay cobertura, el costo y el plazo estimado para tu dirección.'],
  ['¿Cuándo recibiré mi pedido?', 'El plazo depende del destino y de la disponibilidad del equipo. Confirma la fecha estimada y cómo recibirás la información del envío antes de cerrar la compra.'],
  ['¿Qué garantía incluye el equipo?', 'La garantía y su cobertura dependen de cada unidad. Pide al asesor que te indique por escrito el plazo, qué cubre y cuáles son las condiciones antes de pagar.'],
  ['¿Qué debo confirmar antes de pagar?', 'Verifica el modelo, color, capacidad, estado del equipo, precio total, método de pago, garantía y condiciones de entrega. Si tienes alguna duda, consúltala con el asesor antes de confirmar.'],
];

export function FaqSection() {
  return <section id="preguntas" className="faq-section section container"><Reveal><div className="faq-intro"><span className="eyebrow">TODO CLARO, DESDE EL INICIO</span><h2>Preguntas frecuentes.</h2><p>Compra, precios, garantía y entregas: revisa lo importante antes de decidir.</p><a className="text-link whatsapp-text-link" href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> ¿Necesitas ayuda? Escríbenos <span aria-hidden="true">↗</span></a></div></Reveal><Reveal delay={.08}><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true" /></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></Reveal></section>;
}
