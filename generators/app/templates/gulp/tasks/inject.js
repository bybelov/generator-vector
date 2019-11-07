import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import inject from 'gulp-inject';
import config from '../config';

gulp.task('inject', () => gulp

  .src(config.dest.pages + '/index.html')
  .pipe(inject(

    gulp.src(
      [config.src.pages + '/data/*.json'], {
        read: false,
        relative: true
      }), {
      transform: function (filePath, file) {
        if (filePath.slice(-5) === '.json') {
          let listItem;
          let data = JSON.parse(fs.readFileSync(config.src.data + '/' + path.basename(file.path)));
          let regexp = /^(.*[\/])*(.+).json/i;
          let filename = filePath.match(regexp);
          if(data.SETTINGS.showOnIndexPage){
            if (data.SETTINGS.showOnIndexPage !== false) {
              return '<li><a href="' + filename[2] + '.html">' + data.SETTINGS.titleOnIndexPage + '</a></li>'
            }
            const errorMessage = ' No data.SETTINGS.showOnIndexPage object in file: /src/data/' + filename[2] + '.json';
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
