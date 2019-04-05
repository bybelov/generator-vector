import gulp from 'gulp';
import config from '../config';

// copy fonts
gulp.task('copy:fonts', () => gulp

  .src(config.src.fonts + '/*.{ttf,eot,woff,woff2,svg}')
  .pipe(gulp.dest(config.dest.fonts))

);

// copy cursor files
gulp.task('copy:cursor', () => gulp

  .src(config.src.images + '/**/*.cur')
  .pipe(gulp.dest(config.dest.images))

);

const build = gulp => gulp.parallel('copy:fonts', 'copy:cursor');
const watch = gulp => () => gulp.watch(config.src.fonts + '/*.{ttf,eot,woff,woff2,svg}', gulp.series('copy:fonts'));

module.exports.build = build;
module.exports.watch = watch;