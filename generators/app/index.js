'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const prompts = require('./prompts');
const writeFiles = require('./writing');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Hi! This is the ${chalk.green('generator-vector')} ${chalk.red(
          '0.9.2'
        )} workflow for frontend!`
      )
    );

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    console.log(writeFiles, 'WRITE');
    writeFiles.call(this);
  }

  install() {
    if (this.props.install) {
      this.installDependencies({
        bower: false,
        npm: true
      });
    } else {
      this.log('Run ' + chalk.blue('npm install') + ' to install dependencies later');
    }
  }
};
