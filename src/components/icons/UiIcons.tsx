import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, className = '', ...props }: IconProps & { children: ReactNode }) {
  return <svg className={`ui-icon ${className}`.trim()} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export function MenuIcon(props: IconProps) { return <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>; }
export function CloseIcon(props: IconProps) { return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
export function SmartphoneIcon(props: IconProps) { return <Icon {...props}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M10.5 5h3M11 18.5h2" /></Icon>; }
export function CompareIcon(props: IconProps) { return <Icon {...props}><rect x="3" y="5" width="7" height="14" rx="2" /><rect x="14" y="5" width="7" height="14" rx="2" /><path d="M6 8h1M17 8h1" /></Icon>; }
export function TagIcon(props: IconProps) { return <Icon {...props}><path d="M20 13 13 20l-9-9V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1" /></Icon>; }
export function ToolIcon(props: IconProps) { return <Icon {...props}><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4a2.1 2.1 0 0 1-3 3l-7.7-7.7" /></Icon>; }
export function UsersIcon(props: IconProps) { return <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></Icon>; }
export function MailIcon(props: IconProps) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>; }
export function SearchIcon(props: IconProps) { return <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>; }
export function ClockIcon(props: IconProps) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>; }
export function MapPinIcon(props: IconProps) { return <Icon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>; }
export function SocialIcon(props: IconProps) { return <Icon {...props}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></Icon>; }
export function ChevronRightIcon(props: IconProps) { return <Icon {...props}><path d="m9 6 6 6-6 6" /></Icon>; }
export function ChevronLeftIcon(props: IconProps) { return <Icon {...props}><path d="m15 6-6 6 6 6" /></Icon>; }
export function XCircleIcon(props: IconProps) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></Icon>; }
export function SparklesIcon(props: IconProps) { return <Icon {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 14l.7 2.3L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.7L5 14Z" /></Icon>; }
export function ProcessorIcon(props: IconProps) { return <Icon {...props}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3M9.5 9.5h5v5h-5z" /></Icon>; }
export function CameraIcon(props: IconProps) { return <Icon {...props}><path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="4" /></Icon>; }
export function ConnectivityIcon(props: IconProps) { return <Icon {...props}><path d="M4.9 9.9a10 10 0 0 1 14.2 0M7.8 12.8a6 6 0 0 1 8.4 0M10.6 15.6a2 2 0 0 1 2.8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></Icon>; }
export function ShieldIcon(props: IconProps) { return <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
export function TruckIcon(props: IconProps) { return <Icon {...props}><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></Icon>; }
