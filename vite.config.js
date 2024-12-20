import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const hosts = { android: '10.0.2.2', ios: '127.0.0.1' };
  return {
    server: {
      host: '127.0.0.1',
      port: 3000,
      hmr: {
        host: hosts[mode]
      }
    },
    plugins: [
      solid(),
      {
        name: 'vite-plugin-cordova',
        config() {
          return {
            build: {
              outDir: 'www'
            }
          }
        },
        configureServer(server) {
          server.middlewares.use(function(req, _res, next) {
            if (req.url.startsWith('/cordova') || req.url.startsWith('/plugins')) {
              const oldUrl = req.url;
              req.url = `/platforms/${platform}/platform_www` + req.url;
              console.log(`${oldUrl} => ${req.url}`);
            }
            next();
          });
        },
        transformIndexHtml: {
          handler() {
            return [
              { tag: 'script', injectTo: 'head',  attrs: { src: '/cordova.js' } }
            ];
          }
        }
      }
    ]
  };
});
