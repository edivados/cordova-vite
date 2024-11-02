module.exports = function(platform) {
  return {
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
}
