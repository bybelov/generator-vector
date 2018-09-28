var gulp = require('gulp'),
    server = require('browser-sync').create(),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('../config.js');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      config.dest.pages + '/*.html',
      config.dest.css + '/*.css',
      config.dest.images + '/**/*',
      config.dest.fonts + '/**/*'
    ],
    port: argv.port || 3000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(argv.open),
    notify: false,
    ghostMode: false,
    online: Boolean(argv.tunnel),
    tunnel: argv.tunnel || null
  });
});

module.exports = server;
