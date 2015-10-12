// Generated on <%%= (new Date).toISOString().split('T')[0] %> using <%%= pkg.name %> <%%= pkg.version %>

var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var notify = require('gulp-notify');
var wiredep = require('wiredep');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

var argv = require('minimist')(process.argv.slice(2));
var production = argv.production === true;

if (production) {
  console.log('PRODUCTION BUILD')
}

var paths = {
  assets: [
  'app/images*/**/*.{png,jpg,jpeg,gif,svg,ico}',
  'app/styles*/fonts*/**/*.{eot,svg,ttf,woff}'
  ],
  scripts: 'app/scripts/**/*.js',
  styles: 'app/styles/**/*.{scss,css}',
  html: 'app/*.{html,inc}',
  dist: 'dist/'
};

gulp.task('assets', function() {
  gulp.src(paths.assets)
  .pipe(plug.plumber({ errorHandler: notify.onError("Error: <%%= error.message %>") }))
  .pipe(plug.if(production, plug.imageoptim.optimize()))
  .pipe(plug.if(production, gulp.dest(paths.dist)))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts, { read: false })
  .pipe(plug.plumber({ errorHandler: notify.onError("Error: <%%= error.message %>") }))
  .pipe(browserSync.reload({ stream: true }));
});

var pleeease = function() {
  return plug.pleeease(
  {
    minifier: production,
    autoprefixer: {browsers: ["last 20 versions"]}
  });
}

gulp.task('styles', function() {
  return gulp.src('app/styles/main.scss')
  .pipe(plug.plumber({ errorHandler: notify.onError("Error: <%%= error.message %>") }))
  .pipe(plug.if(!production, plug.sourcemaps.init()))
  .pipe(plug.sass({
    onError: function(err) {
      console.error(err);
      browserSync.notify(err);
    },
    includePaths: [
    'app/bower_components/bourbon/app/assets/stylesheets',
    'app/bower_components/neat/app/assets/stylesheets/'
    ]
  }))
  .pipe(plug.if(!production, pleeease()))
  .pipe(plug.if(!production, plug.sourcemaps.write()))
  .pipe(plug.if(production, gulp.dest('app/styles')))
  .pipe(plug.if(!production, gulp.dest('dist/styles')))
  .pipe(plug.filter('**/*.css'))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', ['styles'], function() {
  return gulp.src('app/*.html')
  .pipe(plug.fileInclude())
  .pipe(plug.if(production, plug.usemin({
    css: [pleeease],
    js: [plug.uglify],
    html: [function(){return plug.minifyHtml({conditionals: true})}]
  })))
  .pipe(gulp.dest(paths.dist))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('modernizr', ['styles', 'html'], function() {
  if (production) {
    return gulp.src(['app/styles/*.css', 'app/scripts/main.js'])
    .pipe(plug.plumber({ errorHandler: notify.onError("Error: <%%= error.message %>") }))
    .pipe(plug.modernizr())
    .pipe(plug.uglify())
    .pipe(gulp.dest(paths.dist + 'bower_components/Modernizr/'));
  }
});

gulp.task('clean', function() {
  return del([
    paths.dist + '/*'
  ]);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['./dist/', './app/']
    },
    open: false,
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.assets, ['assets']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('build', function(cb) {
  runSequence('clean', ['assets', 'styles', 'html', 'modernizr'], cb);
});

gulp.task('default', function(cb) {
  runSequence('build', ['browser-sync', 'watch'], cb);
});

gulp.task('bower', function() {
  wiredep({
    src: './app/*.{html,inc}',
    directory: './app/bower_components/',
    exclude: ['jquery.js','modernizr']
  });
});
