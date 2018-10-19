var gulp          = require('gulp'),
  nunjucksRender  = require('gulp-nunjucks-render'),
  plumber         = require('gulp-plumber'),
  gulpif          = require('gulp-if'),
  changed         = require('gulp-changed'),
  prettify        = require('gulp-prettify'),
  data            = require('gulp-data'),
  fs              = require('fs'),
  path            = require('path'),
  // frontMatter  = require('gulp-front-matter'),
  config          = require('../config.js');

function renderHtml(onlyChanged) {

  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.pages + '/**/[^_]*.html'])
    .pipe(gulpif(onlyChanged, changed(config.dest.pages)))
    .pipe(plumber())
    // .pipe(frontMatter({ property: 'data' }))
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(config.src.data + '/' + path.basename(file.path, '.html') + '.json'));
    }))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.pages]
    }))
    .pipe(prettify({
      indent_size: 2,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: false,
      unformatted: ['pre', 'code', 'em', 'i'],
      end_with_newline: false
    }))
    .pipe(gulp.dest(config.dest.pages));
}

gulp.task('nunjucks', function() {
  return renderHtml();
});

gulp.task('nunjucks:changed', function() {
  return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
  gulp.watch([
    config.src.pages + '/**/[^_]*.html'
  ], ['nunjucks:changed', 'inject']);

  gulp.watch([
    config.src.pages + '/**/_*.html'
  ], ['nunjucks', 'inject']);

  gulp.watch([
    config.src.pages + '/**/*.json'
  ], ['nunjucks:changed', 'inject']);
});
