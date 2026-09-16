import Link from 'next/link';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export default function NotFound() { return <main id="main-content" tabIndex={-1} className="section container"><span className="eyebrow">APFEL STORE</span><h1>No encontramos<br /><em>ese iPhone.</em></h1><p className="muted">El enlace no corresponde a un producto disponible.</p><Link className="button button-light" href="/productos">Explorar catálogo <span><ChevronRightIcon /></span></Link></main>; }
