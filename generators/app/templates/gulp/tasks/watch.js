var gulp   = require('gulp'),
    config = require('../config.js');

gulp.task('watch', [
    'copy:watch',
    'video:watch',
    'picture:watch',
    'nunjucks:watch',
    'inject:watch',
    'svg:watch',
    'scss:watch',
    'webpack:watch'
]);
