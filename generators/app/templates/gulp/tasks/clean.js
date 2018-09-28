var gulp = require('gulp'),
    del = require('del'),
    log = require('fancy-log'),
    colors = require('ansi-colors'),
    config = require('../config.js');

gulp.task('clean', function(cb) {
  return del([config.dest.root]).then(function(paths) {
    log.error('Deleted:', colors.red(paths.join('\n')));
  });
});
