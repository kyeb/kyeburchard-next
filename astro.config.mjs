import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kyeb.com',
  // Cloudflare Pages forces trailing slashes for static sites
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [icon()],
  vite: {
    server: {
      allowedHosts: ['staging.kyeb.com'],
    },
  },
});
