var gulp = require('gulp');
var webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var args = require('yargs').argv;
var gulpprint = require('gulp-print');
var spawn = require('child_process').spawn;


gulp.task('build',['eslint'], function() {
	return gulp.src('index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('eslint', () => (
    gulp.src(['**/*.js', '!node_modules/**', '!src/**'])
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('serve',['eslint'], function() {
  spawn('node', ['index.js'], { stdio: 'inherit' });
});