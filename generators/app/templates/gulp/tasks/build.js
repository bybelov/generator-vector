var gulp        = require('gulp'),
    runSequence = require('run-sequence'), // Запуск тасков в нужном порядке
    config      = require('../config.js');

function build(cb) {
  runSequence(
    'clean',
    'generate-favicon',
    'picture',
    'svg',
    'scss',
    'nunjucks',
    'copy',
    'inject',
    'webpack',
    cb
  );
}

gulp.task('build', function(cb) {
  config.setEnv('production');
  config.logEnv();
  build(cb);
});

gulp.task('build:dev', function(cb) {
  config.setEnv('development');
  config.logEnv();
  build(cb);
});
