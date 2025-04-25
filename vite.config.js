import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        contact: 'contact.html',
        scholarships: 'scholarships.html',
        kvpyApplication: 'kvpy-application.html'
      }
    },
    assetsDir: 'assets',
    emptyOutDir: true
  }
});