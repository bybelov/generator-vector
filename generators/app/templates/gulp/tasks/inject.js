import gulp from 'gulp';
import fs from 'fs';
import inject from 'gulp-inject';
import log from 'fancy-log';
import colors from 'ansi-colors';
import sort from 'sort-stream';
import config from '../config';

function getDataFromFile(file, replaceCategory) {
  let fullPath = file.relative.replace(/\.[^/.]+$/, '');
  fullPath = fullPath.replace(`/(${replaceCategory}\\)/`, '');
  return JSON.parse(
    fs.readFileSync(config.src.data + '/' + fullPath + '.json')
  );
}

gulp.task('inject', () =>
  gulp

    .src(config.dest.pages + '/index.html')
    .pipe(
      inject(
        gulp
          .src([config.src.data + '/**/*.json'], {
            read: false,
            relative: true
          })
          .pipe(
            // sort by page name in JSON file
            sort(function(a, b) {
              let testA = getDataFromFile(a, 'data');
              let testB = getDataFromFile(b, 'data');
              let titleA = testA.SETTINGS.titleOnIndexPage;
              let titleB = testB.SETTINGS.titleOnIndexPage;
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              return 0;
            })
          ),
        {
          transform: function(filePath, file) {
            if (filePath.slice(-5) === '.json') {
              const fullPath = file.relative.replace(/\.[^/.]+$/, '');
              const data = getDataFromFile(file, 'page');
              if (data.SETTINGS) {
                if (
                  data.SETTINGS.showOnIndexPage &&
                  data.SETTINGS.showOnIndexPage !== false
                ) {
                  return (
                    '<li><a href="' +
                    fullPath +
                    '.html">' +
                    data.SETTINGS.titleOnIndexPage +
                    '</a></li>'
                  );
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
      )
    )
    .pipe(gulp.dest(config.dest.pages))
);

const build = gulp => gulp.series('inject');
module.exports.build = build;