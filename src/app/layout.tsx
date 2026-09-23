import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/constants/site';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: { default: 'Apfel Store | Tu próximo iPhone', template: '%s | Apfel Store' },
  description: 'Explora iPhones seleccionados, configura el tuyo y conversa por WhatsApp.',
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Apfel Store | Tu próximo iPhone',
    description: 'Explora iPhones seleccionados, configura el tuyo y conversa por WhatsApp.',
    siteName: site.name,
    locale: site.locale,
    type: 'website',
    ...(site.url ? { url: site.url } : {})
  },
  twitter: { card: 'summary', title: 'Apfel Store | Tu próximo iPhone', description: 'Explora iPhones seleccionados, configura el tuyo y conversa por WhatsApp.' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${display.variable} ${body.variable}`}><a className="skip-link" href="#main-content">Saltar al contenido</a><Header />{children}<Footer /></body></html>;
}
