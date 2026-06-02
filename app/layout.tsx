import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ciudadanía Búlgara OK — Tu pasaporte europeo por descendencia',
  description:
    'Gestionamos tu Ciudadanía Búlgara por descendencia de punta a punta: búsqueda de actas, apostillado, traducción oficial y turno consular. Acompañamiento personal de Rodrigo Rojas para argentinos y países limítrofes.',
  metadataBase: new URL('https://ciudadaniabulgaraok.com'),
  openGraph: {
    title: 'Ciudadanía Búlgara OK — Tu pasaporte europeo por descendencia',
    description:
      'Recuperá la herencia de tu familia búlgara y obtené tu pasaporte europeo. Gestión completa, sin errores burocráticos.',
    locale: 'es_AR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17150F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
