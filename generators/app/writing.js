'use strict';

let _ = require('lodash');
let path = require('path');
let mkdirp = require('mkdirp');

module.exports = function() {
  var props = this.props;
  var destPath = this.destinationPath();

  props._ = {
    kebabCase: _.kebabCase,
    camelCase: _.camelCase,
    capitalize: _.capitalize
  };

  // Dotfiles
  this.fs.copy(this.templatePath('gitignore'), '.gitignore');
  this.fs.copy(this.templatePath('eslintrc'), '.eslintrc');
  this.fs.copy(this.templatePath('babelrc'), '.babelrc');
  this.fs.copy(this.templatePath('browserslistrc'), '.browserslistrc');
  this.fs.copy(this.templatePath('gulpfile.babel.js'), 'gulpfile.babel.js');
  this.fs.copy(this.templatePath('jsconfig.json'), 'jsconfig.json');
  this.fs.copy(this.templatePath('webpack.config.js'), 'webpack.config.js');
  this.fs.copy(this.templatePath('README.md'), 'README.md');
  this.fs.copyTpl(this.templatePath('package.json'), 'package.json', props);

  // Gulp tasks
  this.fs.copy(this.templatePath('gulp/**/*.*'), 'gulp/');

  // Src fonts, icons, images, videos
  this.fs.copy(this.templatePath('src/fonts/**/*.*'), 'src/fonts/');
  this.fs.copy(this.templatePath('src/icons/*.svg'), 'src/icons/');
  this.fs.copy(this.templatePath('src/images/**/*.*'), 'src/images/');
  this.fs.copy(this.templatePath('src/videos/**/*.*'), 'src/videos/');

  // Src pages
  this.fs.copy(this.templatePath('src/pages/**/*.*'), 'src/pages/');

  // Src js
  this.fs.copy(this.templatePath('src/js/**/*.*'), 'src/js/');
  this.fs.copyTpl(this.templatePath('src/js/vendor.js'), 'src/js/vendor.js', props);

  // Src styles
  if (props.installBootstrap) {
    this.fs.copy(
      this.templatePath('src/scss/0-settings/_variables-bootstrap.scss'),
      'src/scss/0-settings/_variables.scss'
    );
    mkdirp(path.join(destPath, 'src/scss/3-generic'));
    mkdirp(path.join(destPath, 'src/scss/5-elements'));
    this.fs.copy(this.templatePath('src/scss/main-bootstrap.scss'), 'src/scss/main.scss');
  } else {
    this.fs.copy(
      this.templatePath('src/scss/0-settings/_variables.scss'),
      'src/scss/0-settings/_variables.scss'
    );
    this.fs.copy(this.templatePath('src/scss/3-generic/**/*.*'), 'src/scss/3-generic/');
    this.fs.copy(this.templatePath('src/scss/5-elements/**/*.*'), 'src/scss/5-elements/');
    this.fs.copy(this.templatePath('src/scss/main.scss'), 'src/scss/main.scss');
  }

  this.fs.copy(this.templatePath('src/scss/1-tools/**/*.*'), 'src/scss/1-tools/');
  this.fs.copy(this.templatePath('src/scss/2-fonts/**/*.*'), 'src/scss/2-fonts/');
  mkdirp(path.join(destPath, 'src/scss/4-vendor'));
  this.fs.copy(
    this.templatePath('src/scss/6-components/**/*.*'),
    'src/scss/6-components/'
  );
  this.fs.copy(this.templatePath('src/scss/7-helpers/**/*.*'), 'src/scss/7-helpers/');
};
