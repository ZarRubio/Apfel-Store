import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = { title: { default: 'Apfel Store | Tu próximo iPhone', template: '%s | Apfel Store' }, description: 'Explora iPhones seleccionados, configura el tuyo y conversa por WhatsApp.', metadataBase: new URL('https://apfel-store.example'), robots: { index: false, follow: false } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className={`${display.variable} ${body.variable}`}><a className="skip-link" href="#main-content">Saltar al contenido</a><div className="preview-bar">Vista previa · precios y disponibilidad por confirmar</div><Header />{children}<Footer /></body></html>; }
