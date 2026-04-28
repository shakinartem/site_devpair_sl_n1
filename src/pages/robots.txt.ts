export async function GET({ site }: { site?: URL }) {
  const base = site?.toString() ?? 'https://svetlana-lagutova.pages.dev';

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', base).toString()}\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    }
  );
}
