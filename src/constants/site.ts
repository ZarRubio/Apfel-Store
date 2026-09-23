export const site = {
  name: 'Apfel Store',
  description: 'iPhone elegido con atención humana. Explora modelos, configura el tuyo y conversa por WhatsApp.' as string,
  // Define NEXT_PUBLIC_SITE_URL con el dominio real antes de compilar para Hostinger.
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') || undefined,
  whatsapp: '51921078492',
  locale: 'es_PE'
} as const;
