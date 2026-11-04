import { getWhatsAppUrl } from '@/lib/whatsapp';
import { Reveal } from '@/components/animations/Reveal';
import { AdvisorCard } from '@/components/shared/AdvisorCard';

export function ContactBand() {
  return <div className="container advisor-section"><Reveal><AdvisorCard eyebrow="¿AÚN NO SABES CUÁL ELEGIR?" title="Lo encontramos contigo." description="Cuéntanos qué buscas y te ayudamos a elegir tu próximo iPhone." href={getWhatsAppUrl()} label="Hablar con un asesor" /></Reveal></div>;
}
