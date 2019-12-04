import gulp from 'gulp';
import del from 'del';
import log from 'fancy-log';
import colors from 'ansi-colors';
import config from '../config';

const build = () => {
  return function() {
    return del([
      config.dest.root
    ]).then(function(paths) {
      log.error('Deleted:', colors.red(paths.join('\n')));
    });
  };
};

module.exports.build = build;
