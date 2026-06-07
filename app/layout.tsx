import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://www.ciudadaniabulgara.com.ar';
const SITE_NAME = 'Ciudadanía Búlgara';
const DESCRIPTION =
  'Gestionamos tu Ciudadanía Búlgara por descendencia de punta a punta: búsqueda de actas, apostillado, traducción oficial y turno consular. Acompañamiento personal de Rodrigo Lazaroff para argentinos y países limítrofes.';

export const metadata: Metadata = {
  title: {
    default: 'Ciudadanía Búlgara — Tu pasaporte europeo por descendencia',
    template: '%s · Ciudadanía Búlgara',
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: 'Rodrigo Lazaroff' }],
  creator: 'Rodrigo Lazaroff',
  publisher: SITE_NAME,
  category: 'Legal Services',
  keywords: [
    'ciudadanía búlgara',
    'ciudadanía búlgara por descendencia',
    'pasaporte europeo',
    'nacionalidad búlgara Argentina',
    'trámite ciudadanía Bulgaria',
    'consulado de Bulgaria',
    'apostillado actas',
    'ciudadanía europea descendientes',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ciudadanía Búlgara — Tu pasaporte europeo por descendencia',
    description:
      'Recuperá la herencia de tu familia búlgara y obtené tu pasaporte europeo. Gestión completa, sin errores burocráticos.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/images/Logo_ciudadania_bulgara.png',
        width: 1024,
        height: 1024,
        alt: 'Ciudadanía Búlgara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ciudadanía Búlgara — Tu pasaporte europeo por descendencia',
    description:
      'Recuperá la herencia de tu familia búlgara y obtené tu pasaporte europeo. Gestión completa, sin errores burocráticos.',
    images: ['/images/Logo_ciudadania_bulgara.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17150F',
};

// Datos estructurados (schema.org). Los leen Google y los motores generativos
// (ChatGPT, Perplexity, Google AI Overviews) para entender y citar el sitio.
const faqs = [
  ['¿Cuánto cuesta la gestión?', 'Depende de la complejidad del árbol genealógico y de cuántas actas haya que obtener. La consulta inicial no tiene costo.'],
  ['¿Cuánto tiempo tarda?', 'Una vez presentado el trámite, no hay plazos establecidos. En general, la confirmación llega después de un año, aunque puede variar.'],
  ['¿Necesito viajar a Bulgaria?', 'No. Todo el trámite se gestiona desde Argentina a través del consulado.'],
  ['¿Sirve para mis hijos también?', 'Sí. Una vez reconocida tu ciudadanía, podés transmitirla a tus descendientes. Lo contemplamos desde el armado del legajo.'],
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTION,
      image: `${SITE_URL}/images/Logo_ciudadania_bulgara.png`,
      telephone: '+5493777659236',
      email: 'ciudadania.bulgaria@gmail.com',
      priceRange: '$$',
      founder: { '@type': 'Person', name: 'Rodrigo Lazaroff' },
      areaServed: [
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Country', name: 'Chile' },
        { '@type': 'Country', name: 'Uruguay' },
        { '@type': 'Country', name: 'Paraguay' },
      ],
      availableLanguage: ['es'],
      knowsAbout: [
        'Ciudadanía búlgara por descendencia',
        'Nacionalidad europea',
        'Apostillado y traducción de actas',
        'Trámite consular de Bulgaria',
      ],
      sameAs: ['https://instagram.com/ciudadaniabulgaraok'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: 'es-AR',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
