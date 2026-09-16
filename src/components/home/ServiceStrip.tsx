import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

function PackageIcon() {
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></svg>;
}

function PaymentIcon() {
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 15h4"/></svg>;
}

function DeliveryIcon() {
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
}

export function ServiceStrip() {
  return <div className="service-strip" aria-label="Beneficios de compra">
    <span><PackageIcon /><b>01</b> iPhone sellados y de exhibición</span>
    <span><WhatsAppIcon /><b>02</b> Asesoría por WhatsApp</span>
    <span className="service-highlight"><PaymentIcon /><b>03</b> Pago contraentrega</span>
    <span className="service-highlight"><DeliveryIcon /><b>04</b> Envíos a provincias</span>
  </div>;
}
