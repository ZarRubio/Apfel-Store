'use client';

import { useState } from 'react';
import { site } from '@/constants/site';

interface QueryType {
  id: string;
  icon: string;
  title: string;
  defaultText: string;
}

const QUERY_TYPES: QueryType[] = [
  {
    id: 'buy',
    icon: '🛍️',
    title: 'Comprar un iPhone',
    defaultText: 'Hola Apfel Store, quisiera consultar por modelos disponibles, precios y opciones de compra.',
  },
  {
    id: 'offer',
    icon: '🔥',
    title: 'Consultar Ofertas Especiales',
    defaultText: 'Hola Apfel Store, vi los descuentos especiales en su web y quisiera saber qué modelos en oferta tienen disponibles hoy.',
  },
  {
    id: 'tradein',
    icon: '🔄',
    title: 'Renovar / Dejar mi iPhone',
    defaultText: 'Hola Apfel Store, me gustaría cotizar mi iPhone actual para darlo como parte de pago de un nuevo modelo.',
  },
  {
    id: 'warranty',
    icon: '🛡️',
    title: 'Garantía y Envíos',
    defaultText: 'Hola Apfel Store, quisiera confirmar cobertura de garantía, plazos de entrega y métodos de pago.',
  },
];

export function ContactInteractiveBox() {
  const [selectedType, setSelectedType] = useState<string>('buy');
  const [location, setLocation] = useState<'lima' | 'provincia'>('lima');
  const [modelNote, setModelNote] = useState<string>('');

  const currentType = QUERY_TYPES.find((q) => q.id === selectedType) ?? QUERY_TYPES[0];

  function buildWhatsAppUrl() {
    let message = currentType.defaultText;
    if (modelNote.trim()) {
      message += `\n\nModelo de interés: ${modelNote.trim()}`;
    }
    message += `\nUbicación de entrega: ${location === 'lima' ? 'Lima Metropolitana' : 'Provincia (envío)'}`;

    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="contacto-interactive-box">
      <h2>¿En qué te podemos ayudar hoy?</h2>
      <p>Elige tu tipo de consulta para preparar tu atención directa con un asesor:</p>

      {/* Query Type Buttons */}
      <div className="query-options-grid" role="radiogroup" aria-label="Tipo de consulta">
        {QUERY_TYPES.map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`query-option-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <span aria-hidden="true">{type.icon}</span>
              <span>{type.title}</span>
            </button>
          );
        })}
      </div>

      {/* Location Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          ¿Dónde recibirías tu equipo?
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className={`slot-toggle-button ${location === 'lima' ? 'active' : ''}`}
            onClick={() => setLocation('lima')}
            style={{ flex: 1 }}
          >
            📍 Lima Metropolitana
          </button>
          <button
            type="button"
            className={`slot-toggle-button ${location === 'provincia' ? 'active' : ''}`}
            onClick={() => setLocation('provincia')}
            style={{ flex: 1 }}
          >
            🚚 Envío a Provincia
          </button>
        </div>
      </div>

      {/* Optional Note */}
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="model-note-input" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          Modelo o capacidad de preferencia (opcional):
        </label>
        <input
          id="model-note-input"
          type="text"
          placeholder="Ej: iPhone 16 Pro 256GB Titanio Natural..."
          value={modelNote}
          onChange={(e) => setModelNote(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#f5f5f7',
            border: '1px solid #e5e5ea',
            borderRadius: '10px',
            fontSize: '0.92rem',
            color: '#111113',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Action CTA */}
      <a
        className="button button-dark"
        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', borderRadius: '12px' }}
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        data-event="whatsapp_contact_custom_click"
      >
        <span>💬</span> Iniciar conversación por WhatsApp ↗
      </a>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <small style={{ color: '#86868b', fontSize: '0.78rem' }}>
          Te responderemos con fotos y detalles en menos de 5 minutos.
        </small>
      </div>
    </div>
  );
}

