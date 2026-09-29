import { ImageResponse } from 'next/og';

export const alt = 'Apfel Store: modelos de iPhone y atención por WhatsApp';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '76px 88px', background: '#f5f5f7', color: '#111113', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: 700, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ marginBottom: 52, fontSize: 22, fontWeight: 700, letterSpacing: 5 }}>APFEL STORE</div>
        <div style={{ marginBottom: 20, fontSize: 18, fontWeight: 700, letterSpacing: 4, color: '#66666e' }}>TU PRÓXIMO IPHONE</div>
        <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>Elige el que va contigo.</div>
        <div style={{ marginTop: 26, fontSize: 24, color: '#5e5e66' }}>Modelos, precios y atención por WhatsApp.</div>
      </div>
      <div style={{ width: 210, height: 370, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #202126', borderRadius: 42, background: 'linear-gradient(145deg,#d8d9de,#fdfdff 52%,#b7bac2)', boxShadow: '0 28px 56px rgba(17,17,19,.18)' }}>
        <div style={{ width: 172, height: 332, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 30, background: 'linear-gradient(145deg,#111113,#434752 56%,#8b8e98)' }}>
          <div style={{ width: 74, height: 8, borderRadius: 8, background: '#111113', alignSelf: 'flex-start', marginTop: 12 }} />
        </div>
      </div>
    </div>,
    { ...size },
  );
}
