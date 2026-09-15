export function PurchaseSteps() {
  const steps = [
    {
      num: '01',
      icon: '📱',
      title: 'Elige tu modelo y configuración.',
      text: 'Explora el catálogo o usa el comparador para seleccionar la serie, capacidad de almacenamiento y color que prefieres.',
    },
    {
      num: '02',
      icon: '💬',
      title: 'Conversa con tu asesor personal.',
      text: 'Te enviamos fotos en alta resolución del equipo exacto, salud de batería y confirmamos precio final y plazo de entrega.',
    },
    {
      num: '03',
      icon: '📦',
      title: 'Recibe con garantía y soporte.',
      text: 'Coordinamos entrega rápida en Lima o envío asegurado a provincia vía Olva Courier / Shalom con respaldo de tienda.',
    },
  ];

  return (
    <section id="como-comprar" className="steps-section section container" aria-labelledby="steps-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EXPERIENCIA SIMPLE Y TRANSPARENTE</span>
          <h2 id="steps-heading">Cómo comprar tu próximo iPhone.</h2>
        </div>
        <p>
          Tu elección empieza en la web.<br />
          La atención personalizada y el trato directo se coordinan por WhatsApp.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.num}>
            <div className="step-header">
              <span className="step-number">{step.num}</span>
              <span className="step-icon" aria-hidden="true">{step.icon}</span>
            </div>
            <div className="step-rule" />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
