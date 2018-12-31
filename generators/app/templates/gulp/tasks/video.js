var gulp    = require('gulp'),
    config  = require('../config.js');


gulp.task('video', function() {
  gulp.src(config.src.video + '/*.{mp4,ogv,webm}')
    .pipe(gulp.dest(config.dest.video))
});

gulp.task('video:watch', function() {
  gulp.watch(config.src.video + '/*.{mp4,ogv,webm}', ['video']);
});