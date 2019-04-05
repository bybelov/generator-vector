import gulp from 'gulp';
import critical from 'critical';
import config from '../config';

gulp.task('css:critical', () => gulp
  .src( config.dest.pages + '/*.html', {base: './'})
  .pipe(
    critical.stream({
      base: 'build',
      inline: true,
      css: [
        config.dest.css + '/main.css'
      ],
      dimensions: [
        {
          height: 460,
          width: 560
        },
        {
          height: 520,
          width: 760
        },
        {
          height: 768,
          width: 992
        },
        {
          height: 900,
          width: 1400
        }
      ],
      minify: true,
      timeout: 120000
    })
  )
  .on('error', function(err) { 
    log.error(err.message);
  })
  .pipe(gulp.dest('./'))
);


const build = gulp => gulp.parallel('css:critical');

module.exports.build = build;