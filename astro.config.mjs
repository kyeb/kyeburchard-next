import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kyeb.com',
  trailingSlash: 'always', // Cloudflare Pages forces trailing slashes for static sites
  output: 'static',
  integrations: [icon()],
});
