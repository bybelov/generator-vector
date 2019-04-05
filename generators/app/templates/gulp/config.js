import argv from 'yargs';
import log from 'fancy-log';
import colors from 'ansi-colors';

argv.argv;

// console.log('argv.argv = ' + JSON.stringify(argv.argv) );
const production = argv.argv.production || argv.argv.prod || false;
const srcPath    = 'src',
      destPath   = 'build';

const config = {
  env:          'development',
  production:   production,
  src: {
    root:           srcPath,
    pages:          srcPath + '/pages',
    templates:      srcPath + '/pages/templates',
    data:           srcPath + '/pages/data',
    scss:           srcPath + '/scss',
    js:             srcPath + '/js',
    vendor:         srcPath + '/js/vendor',
    video:          srcPath + '/videos',
    images:         srcPath + '/images',
    demo:           srcPath + '/images/demo',
    favicon:        srcPath + '/images/favicon.png',  // favicon png 256x256
    iconsPng:       srcPath + '/images/sprites',      // png sprite
    iconsSvg:       srcPath + '/icons',               // svg sprite
    fonts:          srcPath + '/fonts'
  },
  dest:{
    root:           destPath,
    pages:          destPath,
    css:            destPath + '/css',
    js:             destPath + '/js',
    video:          destPath + '/videos',
    images:         destPath + '/images',
    demo:           destPath + '/images/demo',
    fonts:          destPath + '/fonts'
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    log(
      'Environment:',
      colors.bgRed(' ' + process.env.NODE_ENV + ' ')
    );
  },

  errorHandler: require('./util/handle-errors')
}

config.setEnv(production ? 'production' : 'development');
module.exports = config;