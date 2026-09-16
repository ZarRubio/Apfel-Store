import { socialNetworks } from '@/constants/social';

function SocialIcon({ name }: { name: 'instagram' | 'tiktok' | 'facebook' }) {
  if (name === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle className="social-icon-fill" cx="17.4" cy="6.7" r="1" />
  </svg>;

  if (name === 'tiktok') return <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14.2 3v11.1a4.6 4.6 0 1 1-3.5-4.5v3.1a1.7 1.7 0 1 0 .6 1.4V3h2.9Z" />
    <path className="social-icon-stroke" d="M14.2 3c.5 2.6 2 4.1 4.8 4.4v3.1c-2-.1-3.5-.8-4.8-1.9" />
  </svg>;

  return <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.8 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H8V13h2.5v8h3.3Z" />
  </svg>;
}

export function SocialLinks({ label = 'Redes sociales' }: { label?: string }) {
  return <div className="social-links" aria-label={label}>
    {socialNetworks.map((network) => network.href
      ? <a key={network.name} className="social-link" href={network.href} target="_blank" rel="noreferrer">
        <span className="social-mark"><SocialIcon name={network.icon} /></span>
        <span>{network.name}</span>
      </a>
      : <span key={network.name} className="social-link is-pending" aria-label={`${network.name}, enlace pendiente`}>
        <span className="social-mark"><SocialIcon name={network.icon} /></span>
        <span>{network.name}</span>
        <small>Próximamente</small>
      </span>)}
  </div>;
}
