var gulp = require('gulp');
var paths = require('./gulp/config').paths;

var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('minify:js', function() {
  return gulp.src(paths.js.src)
      .pipe(uglify())
      .pipe(gulp.dest(paths.js.dest));
});

gulp.task('minify:css', function() {
  return gulp.src(paths.css.src)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.css.dest));
});

var imgCompressOptions = {
  progressive: true,
  svgoPlugins: [{removeViewBox: false}], use: [pngquant()]
};

gulp.task('minify:images', function() {
  return gulp.src(paths.img.src)
      .pipe(imagemin(imgCompressOptions))
      .pipe(gulp.dest(paths.img.dest));
});

gulp.task('default', function(done) {
  return runSequence('clean', 'copy', ['jade', 'scss', 'scripts'], done);
});

gulp.task('default', function(done) {
  return runSequence('base', 'watch', 'notify', 'connect', done);
});
