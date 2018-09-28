const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const config = require('../config.js');

// TASK для генерации спрайтов SVG файлов
// online конфигуратор http://jkphl.github.io/svg-sprite/#json
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
        template: 'gulp/tasks/sprites/svg-sprite-preview.html',
        dest: `../../${  config.dest.root  }/svg-sprite-preview.html`,
      },
    },
    symbol: {
      dest: '.',
      sprite: 'svg-sprite.svg',
    },
  },
};

gulp.task('svg:main', () => {
  return gulp.src(config.src.iconsSvg + '/*.svg')
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
    .pipe(gulp.dest(config.dest.images));
});

// Генерация css файла для svg спрайта, для предпросмотра
gulp.task('svg:preview', ['svg:main'], () => {
  gulp.src(config.src.scss + '/6-components/sprites/svg-preview.scss')
    .pipe(plumber())
    .pipe(sass().on('error', config.errorHandler))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('svg', [
  'svg:main',
  'svg:preview',
]);

gulp.task('svg:watch', () => {
  gulp.watch(config.src.iconsSvg + '/*.svg', ['svg']);
});