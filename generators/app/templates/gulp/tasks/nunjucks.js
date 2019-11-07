import gulp from 'gulp';
import _ from 'lodash';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import prettify from 'gulp-prettify';
// import frontMatter from 'gulp-front-matter';
import data from 'gulp-data';
import fs from 'fs';
import path from 'path';
import config from '../config';


function getDataFromFile(file){
  return JSON.parse(fs.readFileSync(config.src.data + '/' + path.basename(file.path, '.html') + '.json'));
}

var manageEnvironment = function(environment) {
  // The includes() method determines whether one string may be found within another string, returning true or false as appropriate.
  // find element in array
  // example: {% if _includes(array, element) %}
  environment.addGlobal('_includes', function(arr, item){
    return _.includes(arr, item);
  })
}

const renderHtml = onlyChanged => {

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
    .pipe(data(getDataFromFile))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.pages],
      manageEnv: manageEnvironment
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

gulp.task('nunjucks', () => renderHtml());
gulp.task('nunjucks:changed', () => renderHtml(true));

const build = gulp => gulp.series('nunjucks', 'inject');

const watch = gulp => {
  return function() {

    gulp.watch([
      config.src.pages + '/**/[^_]*.html'
    ], gulp.series('nunjucks:changed', 'inject'));

    gulp.watch([
      config.src.pages + '/**/_*.html'
    ], gulp.series('nunjucks', 'inject'));

    gulp.watch([
      config.src.pages + '/**/*.json'
    ], gulp.series('nunjucks:changed', 'inject'));

  }
};

module.exports.build = build;
module.exports.watch = watch;
