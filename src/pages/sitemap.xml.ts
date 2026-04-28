export async function GET({ site }: { site?: URL }) {
  const base = site?.toString() ?? 'https://svetlana-lagutova.pages.dev';
  const routes = [
    '/',
    '/privacy-policy',
    '/public-offer',
    '/consent',
    '/thank-you',
    '/404'
  ];

  const urls = routes
    .map(
      (route) => `<url><loc>${new URL(route, base).toString()}</loc><changefreq>monthly</changefreq><priority>${route === '/' ? '1.0' : '0.5'}</priority></url>`
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    }
  );
}
