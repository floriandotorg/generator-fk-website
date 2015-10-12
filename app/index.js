'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips install dependencies',
      type: Boolean
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Website Generator'));
    }

    this.slugName = _s.slugify(this.appname);
  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          pkg: this.pkg
        }
      );
    },

    gitignore: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    packageJSON: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },

    bower: function () {
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          slugName: _s.slugify(this.appname),
        }
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    mainStylesheet: function() {
      this.fs.copy(
        this.templatePath('main.scss'),
        this.destinationPath('app/styles/main.scss')
      );
    },

    favicon: function() {
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('images/favicon.ico')
      );
    },

    html: function() {
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html')
      );

      this.fs.copyTpl(
        this.templatePath('header.inc'),
        this.destinationPath('app/header.inc'),
        {
          slugName: _s.slugify(this.appname),
        }
      );

      this.fs.copy(
        this.templatePath('footer.inc'),
        this.destinationPath('app/footer.inc')
      );
    },

    scripts: function() {
      this.fs.write(this.destinationPath('app/scripts/main.js'), '');
    }
  },

  install: function () {
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  }
});
