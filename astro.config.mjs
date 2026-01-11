import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kyeb.com',
  trailingSlash: 'never',
  output: 'static',
  integrations: [icon()],
});
