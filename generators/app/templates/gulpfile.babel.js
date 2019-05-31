import gulp from 'gulp';
import config from './gulp/config';

const getTaskBuild = task => require('./gulp/tasks/' + task).build(gulp);
const getTaskWatch = task => require('./gulp/tasks/' + task).watch(gulp);

// build tasks
gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('nunjucks', () => getTaskBuild('nunjucks'));
gulp.task('inject', getTaskBuild('inject'));
gulp.task('scss', () => getTaskBuild('scss'));
gulp.task('server', getTaskBuild('server'));
gulp.task('video', getTaskBuild('video'));
gulp.task('images', getTaskBuild('images'));
gulp.task('sprite:png', getTaskBuild('sprite-png'));
gulp.task('sprite:svg', getTaskBuild('sprite-svg'));
gulp.task('webpack', getTaskBuild('webpack'));
gulp.task('css:critical', getTaskBuild('css-critical'));
gulp.task('favicon', getTaskBuild('favicon'));

// watch tasks
gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('nunjucks:watch', getTaskWatch('nunjucks'));
gulp.task('scss:watch', getTaskWatch('scss'));
gulp.task('video:watch', getTaskWatch('video'));
gulp.task('images:watch', getTaskWatch('images'));
gulp.task('sprite-png:watch', getTaskWatch('sprite-png'));
gulp.task('sprite-svg:watch', getTaskWatch('sprite-svg'));
gulp.task('webpack:watch', getTaskWatch('webpack'));

const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
}

const setmodeDev = done => {
  config.setEnv('development');
	config.logEnv();
  done();
}

// build production
gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    'scss',
    'favicon',
    'nunjucks',
    'inject',
    'images',
    'sprite:png',
    'sprite:svg',
    'webpack',
    'css:critical',
    'video',
    'copy'
	)
);

// build develop
gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    'scss',
    'favicon',
    'nunjucks',
    'inject',
    'images',
    'sprite:png',
    'sprite:svg',
    'webpack',
    'video',
    'copy'
  )
);

// watch
gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',
    'video:watch',
    'images:watch',
    'sprite-png:watch',
    'sprite-svg:watch',
    'nunjucks:watch',
    'webpack:watch',
    'scss:watch'
  )
);

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));
