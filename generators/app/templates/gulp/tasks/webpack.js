const gulp          = require('gulp'),
      webpackStream = require('webpack-stream'),
      config        = require('../config.js'),
      webpackConfig   = require('../../webpack.config.js');

gulp.task('webpack', () => {
  gulp.src(config.src.js)
    .pipe(webpackStream(webpackConfig), require('webpack'))
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('webpack:watch', function() {
    gulp.watch(config.src.js + '/**/*.js', ['webpack']);
});
