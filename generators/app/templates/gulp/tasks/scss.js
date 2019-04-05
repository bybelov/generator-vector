import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import easings from 'postcss-easings';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import config from '../config';

const isMax = mq => /max-width/.test(mq);
const isMin = mq => /min-width/.test(mq);

const sortMediaQueries = (a, b) => {
    let A = a.replace(/\D/g, '');
    let B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }
    return 1;
}

const processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  easings(),
  mqpacker({
    sort: sortMediaQueries
  }),
  cssnano()
];

gulp.task('scss', () => gulp
  .src(config.src.scss + '/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', config.errorHandler))
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.dest.css))
);


const build = gulp => gulp.parallel('scss');
const watch = gulp => () => gulp.watch(config.src.scss + '/**/*.{scss}', gulp.parallel('scss'));

module.exports.build = build;
module.exports.watch = watch;