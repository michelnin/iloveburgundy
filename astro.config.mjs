// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ningbomei.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    responsiveStyles: true,
  },
});
