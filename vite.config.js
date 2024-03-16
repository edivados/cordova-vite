import { defineConfig } from 'vite';
import solid from "vite-plugin-solid";
import { readFileSync } from "node:fs";

export default defineConfig(env => ({
  build: {
    outDir: 'www'
  },
  server: {
    host: "127.0.0.1",
    port: 8000
  },
  plugins: [
    solid(),
    {
      name: 'cordova:dev:indexHtmlTransform',
      apply: "serve",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          // TODO: swap based on platform 
          const content = readFileSync("./platforms/android/platform_www/cordova.js", "utf-8");
          html = html.replace(`content="default-src 'self'`, `content="default-src 'self' 'unsafe-inline'`);
          return { html, tags: [
            { tag: "script", injectTo: "head",  children: content }
          ]};
        }
      }
    },
    {
      name: 'cordova:prod:indexHtmlTransform',
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return [
            { tag: "script", injectTo: "head",  attrs: { src: "cordova.js" } }
          ];
        }
      }
    }
  ]
}));
