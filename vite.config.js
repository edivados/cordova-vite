import { defineConfig } from 'vite';
import solid from "vite-plugin-solid";

function cordova() {
  const SUPPORTED_PLATFORMS = {
    android: { name: "android", hmr: { host: "10.0.2.2" } },
    ios: { name: "ios", hmr: { host: "127.0.0.1" } }
  };
  let platform;
  return {
    name: "vite-plugin-cordova",
    config(_config, env) {
      platform = SUPPORTED_PLATFORMS[process.env.CORDOVA_PLATFORM?.toLowerCase?.()];
      if (env.command === "serve" && !platform) {
        console.error(`Missing CORDOVA_PLATFORM env variable. Can be one of [${Object.keys(SUPPORTED_PLATFORMS).join(", ")}]`);
        process.exit(1);
      }
      return {
        build: {
          outDir: 'www'
        },
        server: {
          host: "127.0.0.1",
          port: process.env.CORDOVA_PORT || 3000,
          hmr: {
            host: platform?.hmr?.host
          }
        }
      }
    },
    configureServer(server) {
      server.middlewares.use(function(req, _res, next) {
        if (req.url.startsWith("/cordova") || req.url.startsWith("/plugins")) {
          console.log("old:", req.url)
          req.url = `/platforms/${platform.name}/platform_www` + req.url;
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
        if (ctx.server && platform?.name === "android") {
          tags.push({ 
            tag: "script",
            injectTo: "head", 
            children: `document.addEventListener("deviceready", function() {
              const match = /Chrome\\/([\\d+\\.]+)\\s/.exec(window.navigator.userAgent);
              if (match && match.length === 2 && match[1].split(".")[0] < 61) {
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
}

export default defineConfig({
  plugins: [
    cordova(),
    solid()
  ]
});
