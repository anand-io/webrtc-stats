var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minify = require('gulp-minify');

gulp.task('build-lib', function () {
    return browserify('./lib/index.js')
    .require('./lib/index.js', { expose: 'WebRTCUtils'})
    .bundle()
    .pipe(source('WebRTCStats.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('minify', ['build-lib'], function() {
  gulp.src('./WebRTCStats.js')
    .pipe(minify())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build-lib', 'minify']);
