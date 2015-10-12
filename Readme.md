# Yeoman generator for a static website

[Yeoman](http://yeoman.io) generator that scaffolds out a static website.

```sh
npm i -g generator-fk-website
```

## Features

* [Gulp](http://gulpjs.com) task-runner
* SCSS with [libsass](https://github.com/sass/libsass)
* Simple [Templating](https://github.com/coderhaoxin/gulp-file-include)
* [SMACSS](https://smacss.com) Support
* [Normalize CSS](https://necolas.github.io/normalize.css/)
* CSS [Pleeease](http://pleeease.io)
* Simple [Templating](https://github.com/coderhaoxin/gulp-file-include)
* Built-in preview server with [BrowserSync](http://www.browsersync.io)
* Automagically wire up your Bower components with [wiredep](https://github.com/taptapship/wiredep).
* Image Optimization [imageoptim](https://imageoptim.com)
* [Bourbon](http://bourbon.io) and [Neat](http://neat.bourbon.io)
* [Usemin](https://github.com/zont/gulp-usemin)
* [jQuery 2.x](http://jquery.com)
* Lean [Modernizr](https://modernizr.com) builds

## Getting Started

- Install: `npm install -g generator-fk-website`
- Run: `yo fk-website`
- Run `gulp` for preview and `gulp build --production` for building


#### Third-Party Dependencies

*(HTML/CSS/JS/Images/etc)*

Third-party dependencies are managed with [wiredep](https://github.com/taptapship/wiredep). Add new dependencies using [Bower](http://bower.io) and then run the `gulp bower` task to load them:

```sh
$ bower install --save jquery
$ gulp bower
```

This works if the package author has followed the [Bower spec](https://github.com/bower/bower.json-spec). If the files are not automatically added to your source code, check with the package's repo for support and/or file an issue with them to have it updated.

To manually add dependencies, `bower install --save depName` to get the files, then add a `script` or `style` tag to your `index.html` or another appropriate place.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
