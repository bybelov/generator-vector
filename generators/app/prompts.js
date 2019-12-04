'use strict';

module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?',
    default: 'app'
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Description project?',
    default: 'Static site'
  },
  {
    type: 'input',
    name: 'projectVersion',
    message: 'Version project?',
    default: '0.0.1'
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies right now?',
    default: false
  }
];
