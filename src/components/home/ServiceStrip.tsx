export function ServiceStrip() {
  const pillars = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: 'Garantía Escrita y Respaldo',
      desc: 'Equipos 100% originales con cobertura real y soporte técnico directo de tienda.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: 'Entrega Inmediata y Envíos',
      desc: 'Entregas el mismo día en Lima y envíos asegurados a provincias vía Olva o Shalom.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
      title: 'Fotos y Videos Reales',
      desc: 'Transparencia absoluta: te mostramos el equipo exacto y la salud de batería antes de pagar.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      ),
      title: 'Múltiples Medios de Pago',
      desc: 'Transferencias, Yape, Plin, tarjetas y contraentrega coordinada con un asesor.',
    },
  ];

  return (
    <div className="service-strip-enhanced" aria-label="Beneficios y compromisos de compra">
      <div className="container service-strip-grid">
        {pillars.map((item, index) => (
          <div key={index} className="service-strip-card">
            <div className="service-strip-icon-box">{item.icon}</div>
            <div className="service-strip-body">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
