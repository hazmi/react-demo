'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').js;

var opts = {
  entries: [config.src],
  debug: true
};
var b;

function bundle() {
  b.transform("babelify", {presets: ["es2015", "react"]})
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
}

gulp.task('js', function(){
  b = browserify(opts);
  b.on('log', gutil.log);
  return bundle();
});

gulp.task('js:watch', function(){
  b = watchify(browserify(opts));
  b.on('log', gutil.log);
  b.on('update', bundle);
  return bundle();
});
