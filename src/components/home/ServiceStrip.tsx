import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function ServiceStrip() {
  return <div className="service-strip" aria-label="Beneficios de compra">
    <span><b>01</b> iPhone sellados y de exhibición</span>
    <span><WhatsAppIcon /><b>02</b> Asesoría por WhatsApp</span>
    <span className="service-highlight"><b>03</b> Pago contraentrega</span>
    <span className="service-highlight"><b>04</b> Envíos a provincias</span>
  </div>;
}
