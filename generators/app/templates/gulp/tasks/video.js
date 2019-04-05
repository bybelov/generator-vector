import gulp from 'gulp';
import config from '../config';

// copy video files
gulp.task('video', () => gulp

  .src(config.src.video + '/*.{mp4,ogv,webm}')
  .pipe(gulp.dest(config.dest.video))

);

const build = gulp => gulp.parallel('video');
const watch = gulp => () => gulp.watch(config.src.video + '/*.{mp4,ogv,webm}', gulp.series('video'));

module.exports.build = build;
module.exports.watch = watch;