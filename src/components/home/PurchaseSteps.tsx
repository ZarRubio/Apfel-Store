const steps = [['01', 'Encuentra tu iPhone.', 'Explora los modelos y elige el color, la capacidad y la condición que buscas.'], ['02', 'Conversemos.', 'Recibimos tu selección y confirmamos el precio, la disponibilidad y los detalles del equipo.'], ['03', 'Coordina tu entrega.', 'Resuelve tus dudas con un asesor y acuerda el pago y la entrega según tu ubicación.']];

export function PurchaseSteps() {
  return <section id="como-comprar" className="steps-section section container"><div className="section-heading"><div><span className="eyebrow">CERCA DE TI, EN CADA PASO</span><h2>Así de simple.</h2></div><p>Tu compra empieza aquí.<br />La conversación sigue en WhatsApp.</p></div><div className="steps-grid">{steps.map(([number, title, text]) => <article className="step" key={number}><span className="step-number">{number}</span><div className="step-rule" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}
