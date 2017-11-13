let gulp = require('gulp');
let webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
let gulpif = require('gulp-if');
let args = require('yargs').argv;
let gulpprint = require('gulp-print');
let spawn = require('child_process').spawn;


gulp.task('build',['eslint','copy-config'] , () => {
	return gulp.src('index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('eslint', () => (
    gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('serve',['eslint'], () => {
  spawn('node', ['index.js'], { stdio: 'inherit' });
});

gulp.task('copy-config', () => {
    var config =  gulp.src(['config/**/*']).pipe(gulp.dest('build/config'));
    var packageJson = gulp.src(['package.json']).pipe(gulp.dest('build'));
    return Promise.all([config, packageJson]);
});