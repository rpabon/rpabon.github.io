var gulp = require('gulp');
var paths = require('../config').paths;
var flag = require('yargs').argv;
var runSequence = require('run-sequence');
var eventStream = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');
var _if = require('gulp-if');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var hintStylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var codeStylish = require('gulp-jscs-stylish');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var doNothing = function() {};
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('scripts:hint', function() {
  var taskStream = gulp.src(paths.tasks);
  var jsStream = gulp.src(paths.js.srcAll);

  //TODO: Add jshint to JSX files
  return eventStream.merge(taskStream, jsStream)
      .pipe(jshint())
      .pipe(jscs({'preset': 'google'})).on('error', doNothing)
      .pipe(codeStylish.combineWithHintResults())
      .pipe(jshint.reporter(hintStylish));
});

gulp.task('scripts:bundle', function() {
  var bundler = browserify({
    entries: [paths.js.bundleFile], // Only need initial file, browserify finds the deps
    transform: [reactify],
    debug: !flag.production // Gives us sourcemapping
    //cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });
  return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(connect.reload());
});

var files = [
  './src/js/lodash.js',
  './src/js/jquery.js',
  './src/js/jquery-ui.js',
  './src/js/jquery-ui.touch-punch.js',
  './src/js/megaman.js'
];

gulp.task('scripts:concat', function() {
  return gulp.src(files)
      .pipe(concat('main.js'))
      .pipe(_if(flag.production, uglify()))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(connect.reload());
});

gulp.task('scripts', function(done) {
  runSequence('scripts:concat', done);
});
