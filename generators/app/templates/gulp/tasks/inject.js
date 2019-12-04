import gulp from 'gulp';
import fs from 'fs';
import inject from 'gulp-inject';
import log from 'fancy-log';
import colors from 'ansi-colors';
import config from '../config';

gulp.task('inject', () => gulp

  .src(config.dest.pages + '/index.html')
  .pipe(inject(

    gulp.src(
      [config.src.data + '/**/*.json'], {
        read: false,
        relative: true
      }), {
      transform: function(filePath, file) {
        if (filePath.slice(-5) === '.json') {
          const fullPath = file.relative.replace(/\.[^/.]+$/, '');
          const data = JSON.parse(fs.readFileSync(config.src.data + '/' + fullPath + '.json'));

          if (data.SETTINGS) {
            if (data.SETTINGS.showOnIndexPage && data.SETTINGS.showOnIndexPage !== false) {
              return '<li><a href="' + fullPath + '.html">' + data.SETTINGS.titleOnIndexPage + '</a></li>';
            }
          } else {
            const errorMessage = `No data.SETTINGS object in file: ${file.path}`;
            log.error(colors.yellow(errorMessage));
          }
        }
        // Use the default transform as fallback:
        return inject.transform.apply(inject.transform, arguments);
      }
    }
  ))
  .pipe(gulp.dest(config.dest.pages))

);

const build = gulp => gulp.series('inject');
module.exports.build = build;