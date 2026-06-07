import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ciudadaniabulgara.com.ar';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores y crawlers de IA: permitidos (queremos ser indexados y citados).
      {
        userAgent: [
          '*',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
