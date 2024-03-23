import { defineConfig } from 'vite';
import solid from "vite-plugin-solid";

const SUPPORTED_PLATFORMS = ["android", "ios"]

export default defineConfig((config) => {
  const platform = process.env.CORDOVA_PLATFORM?.toLowerCase?.();
  if (config.command === "server" && !SUPPORTED_PLATFORMS.includes(platform)) {
    console.error(`Missing CORDOVA_PLATFORM env variable. Can be one of [${SUPPORTED_PLATFORMS.join(", ")}]`);
    process.exit(1);
  }
  return {
    build: {
      outDir: 'www'
    },
    server: {
      host: "127.0.0.1",
      port: 3000,
      hmr: {
        host: platform === "android" ? "10.0.2.2" : "127.0.0.1"
      },
    },
    plugins: [
      solid(),
      {
        name: "cordova",
        configureServer(server) {
          server.middlewares.use(function(req, res, next) {
            if (req.url.startsWith("/cordova") || req.url.startsWith("/plugins")) {
              console.log("old:", req.url)
              req.url = `/platforms/${platform}/platform_www` + req.url;
              console.log("new:", req.url);
            }
            next();
          });
        },
        transformIndexHtml: {
          handler(_html, ctx) {
            const tags = [
              { tag: "script", injectTo: "head",  attrs: { src: "/cordova.js" } }
            ];
            if (ctx.server) {
              tags.push({ 
                tag: "script",
                injectTo: "head", 
                children: `document.addEventListener("deviceready", function() {
                  const match = /Chrome\\/([\\d+\\.]+)\\s/.exec(window.navigator.userAgent);
                  if (match.length === 2 && match[1].split(".")[0] < 61) {
                    alert("Webview version 61 or newer required for development. Your version: " + match[1]);
                    navigator.app.exitApp();
                  }
                })`
              });
            }
            return tags;
          }
        }
      }
    ]
  }
});
