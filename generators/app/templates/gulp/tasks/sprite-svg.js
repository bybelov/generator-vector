import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import config from '../config';

// online configurator http://jkphl.github.io/svg-sprite/#json
const configSVG = {
  dest: '.',
  transform: {
    svgo: true,
  },
  mode: {
    css: {
      dest: '.',
      common: 'svg-icon',
      prefix: '.icon-',
      dimensions: ' ', // DONT REMOVE SPACE!!! (need for generate _-svg-sprite.scss)
      sprite: 'svg-sprite.svg',
      bust: false,
      render: {
        // "css": true,
        scss: {
          template: `${config.src.scss  }/6-components/sprites/_svg-sprite-template.scss`,
          dest: `../../${  config.src.scss  }/6-components/sprites/_svg-sprite.scss`,
        },
      },
      example: {
        template: 'gulp/tasks/sprite-svg/svg-sprite-preview.html',
        dest: `../../${  config.dest.root  }/svg-sprite-preview.html`,
      },
    },
    symbol: {
      dest: '.',
      sprite: 'svg-sprite.svg',
    },
  },
};

gulp.task('svg:main', () => gulp

  .src(config.src.iconsSvg + '/*.svg')
  .pipe(plumber())
  .pipe(svgmin({
    plugins: [{
      removeDoctype: true
    }, {
      removeComments: true
    }, {
      removeStyleElement: true
    }, {
      convertColors: {
        names2hex: false,
        rgb2hex: false
      }
    }]
  }))
  // build svg sprite
  .pipe(svgSprite(configSVG))
  .on('error', config.errorHandler)
  .pipe(gulp.dest(config.dest.images))

);

// Генерация css файла для svg спрайта, для предпросмотра
gulp.task('svg:preview', () => gulp

  .src(config.src.scss + '/6-components/sprites/svg-preview.scss')
  .pipe(plumber())
  .pipe(sass().on('error', config.errorHandler))
  .pipe(gulp.dest(config.dest.css))

);

const build = gulp => gulp.series('svg:main', 'svg:preview');
const watch = gulp => () => gulp.watch(config.src.iconsSvg + '/*.svg', gulp.series('svg:main', 'svg:preview'));

module.exports.build = build;
module.exports.watch = watch;