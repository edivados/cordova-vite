import { defineConfig } from 'vite';
import solid from "vite-plugin-solid";
import { spawn } from "child_process";

export default defineConfig(env => ({
  build: {
    outDir: 'www'
  },
  server: {
    host: "127.0.0.1",
    port: 8000,
    hmr: {
      host: "10.0.2.2" // localhost or don't set for ios?
    },
  },
  plugins: [
    solid(),
    {
      name: 'cordova:indexHtmlTransform',
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler() {
          return [
            { tag: "script", injectTo: "head",  attrs: { src: "cordova.js" } }
          ];
        }
      }
    }
  ]
}));
