var gulp    = require('gulp'),
    config  = require('../config.js');

// copy fonts
gulp.task('copy:fonts', function() {
  gulp.src(config.src.fonts + '/*.{ttf,eot,woff,woff2,svg}')
    .pipe(gulp.dest(config.dest.fonts))
});

// copy cursor files
gulp.task('copy:cursor', function() {
  gulp.src(config.src.images + '/**/*.cur')
    .pipe(gulp.dest(config.dest.images))
});

gulp.task('copy', [
    'copy:fonts',
    'copy:cursor'
]);

gulp.task('copy:watch', function() {
  gulp.watch(config.src.fonts + '/*.{ttf,eot,woff,woff2,svg}', ['copy:fonts']);
});
