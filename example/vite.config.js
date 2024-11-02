import { defineConfig } from 'vite';
import cordova from 'vite-plugin-cordova';
import solid from 'vite-plugin-solid';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
    hmr: {
      host: '10.0.2.2'
    }
  },
  plugins: [
    cordova("android"),
    solid()
  ]
});
