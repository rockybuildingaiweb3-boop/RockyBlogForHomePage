import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = (process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://rockychen.me').replace(/\/+$/, '');

export default defineConfig({
  site: siteUrl,
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
});
