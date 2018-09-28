var gulp          = require('gulp'),
    sourcemaps    = require('gulp-sourcemaps'),
    sass          = require('gulp-sass'),
    postcss       = require('gulp-postcss'),
    easings       = require('postcss-easings'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    cssnano       = require('cssnano'),
    config        = require('../config.js');

var processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  easings(),
  mqpacker({
    sort: sortMediaQueries
  }),
  cssnano()
];

gulp.task('scss', function () {
  gulp.src(config.src.scss + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', config.errorHandler))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css))
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}

gulp.task('scss:watch', function() {
  gulp.watch(config.src.scss + '/**/*.scss', ['scss']);
});
