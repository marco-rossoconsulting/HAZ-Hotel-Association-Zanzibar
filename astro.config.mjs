// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.haz.or.tz',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // i18n-ready: English (British) today. To add Kiswahili later, add 'sw' to locales,
  // create src/i18n/sw.ts and mirror pages under src/pages/sw/.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/thank-you'),
    }),
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
});
