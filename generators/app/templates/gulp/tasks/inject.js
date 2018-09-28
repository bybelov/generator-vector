var gulp = require('gulp'),
  inject = require('gulp-inject'),
  fs = require('fs'),
  path = require('path'),
  config = require('../config.js');

gulp.task('inject', ['nunjucks'], function () {

  gulp.src(config.dest.pages + '/index.html')
    .pipe(inject(

      gulp.src(
        [config.src.pages + '/data/*.json'], {
          read: false,
          relative: true
        }), {
        transform: function (filePath, file) {
          if (filePath.slice(-5) === '.json') {
            let listItem;
            let test = JSON.parse(fs.readFileSync(config.src.data + '/' + path.basename(file.path)));
            let regexp = /^(.*[\\{1,2}/])*(.+).json/i;
            let filename = filePath.match(regexp);
            if (filename[2] != 'index') { // исключаем index.html из списка
              listItem = '<li><a href="' + filename[2] + '.html">' + test.page.title + '</a></li>'
            }
            return listItem;
          }
          // Use the default transform as fallback:
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(gulp.dest(config.dest.pages));
});

gulp.task('inject:watch', ['nunjucks:watch'], function () {
  gulp.watch(config.src.pages + '/**/[^_]*.html', ['inject']);
});