import gulp from 'gulp';
import browserSync from 'browser-sync';
import argv from 'yargs';
import config  from '../config';

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

argv.argv;

const server = browserSync.create();
const serverConfig = {
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
    config.dest.video + '/**/*',
    config.dest.fonts + '/**/*'
  ],
  port: argv.argv.port || 3000,
  logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
  logConnections: false,
  logFileChanges: true,
  open: Boolean(argv.argv.open),
  notify: false,
  ghostMode: false,
  online: Boolean(argv.argv.tunnel),
  tunnel: argv.argv.tunnel || null
};


gulp.task('server', done => {
  server.init(serverConfig);
  done();
});


const build = gulp => gulp.parallel('server');

module.exports.build = build;
module.exports.server = server;