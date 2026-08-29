import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // User site de GitHub Pages: sirve desde la raiz del dominio, asi que no
  // lleva `base`. Si algun dia pasa a ser un project site, hay que agregarlo.
  site: 'https://balbianoluciano.github.io',
  integrations: [react(), tailwind()],
  devOptions: {
    // Deshabilitar la barra de herramientas de desarrollo
    devToolbar: false,
  },
});