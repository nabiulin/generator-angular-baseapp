'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('AngularBaseapp') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'appName',
      message: 'Set the project name?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      //base structure
      this.mkdir('src');
      this.mkdir('src/backend');
      this.mkdir('src/frontend');
      this.mkdir('src/frontend/app');

      //default module
      this.mkdir('src/frontend/app/default');

      //libs, styles, common files etc
      this.mkdir('src/frontend/assets');
      this.mkdir('src/frontend/common');
      this.mkdir('src/frontend/styles');

      this.mkdir('src/frontend/vendor');

      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.template('_index.html', 'index.html');
      this.template('_bower.json', 'bower.js');
      this.template('_app.js', 'app/app.js');
      this.template('_bowerrc', '.bowerrc');

    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
