import gulp from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import config from '../config';

gulp.task('images', () =>
  gulp
    .src([
      config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}',
      '!' + config.src.iconsPng + '/**/*.png'
    ])
    .pipe(newer(config.dest.images))
    .pipe(plumber())
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }), // compress .gif
          imagemin.mozjpeg({quality: 75, progressive: true}), // compress .jpg
          imagemin.optipng({ optimizationLevel: 3 }), // optimization level, from 0 to 7
          imagemin.svgo({ plugins: [{ removeViewBox: false }] }) // compress .svg
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest(config.dest.images))
);

const build = gulp => gulp.parallel('images');
const watch = gulp => () =>
  gulp.watch(
    [
      '!' + config.src.iconsPng + '/**/*.png',
      config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}'
    ],
    gulp.series('images')
  );

module.exports.build = build;
module.exports.watch = watch;