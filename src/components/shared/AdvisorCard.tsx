import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

interface AdvisorCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  label: string;
  event?: string;
}

export function AdvisorCard({ eyebrow, title, description, href, label, event = 'whatsapp_click' }: AdvisorCardProps) {
  return <section className="advisor-card" aria-label={title}>
    <div className="advisor-card-copy">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <a className="advisor-card-button" href={href} target="_blank" rel="noreferrer" data-event={event}>
      <WhatsAppIcon /> {label} <span aria-hidden="true">↗</span>
    </a>
  </section>;
}
