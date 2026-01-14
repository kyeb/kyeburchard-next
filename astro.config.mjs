import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kyeb.com',
  // Cloudflare Pages forces trailing slashes for static sites
  trailingSlash: 'always',
  output: 'static',
  integrations: [icon()],
});
