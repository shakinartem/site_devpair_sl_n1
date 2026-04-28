import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://shakinartem.github.io/site_devpair_sl_n1/',
  base: process.env.BASE_PATH ?? '/',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  build: {
    format: 'file'
  }
});
