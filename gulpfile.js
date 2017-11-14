"use strict" ;
const gulp = require( "gulp" );
const webpack = require( "webpack-stream" );
const eslint = require( "gulp-eslint" );
const gulpif = require( "gulp-if" );
const args = require( "yargs" ).argv;
const gulpprint = require( "gulp-print" );
const spawn = require( "child_process" ).spawn;
const esConfig = require( "./webpack.config" );
const nodemon = require('gulp-nodemon');

gulp.task( "build", [ "eslint", "copy-config" ], () => {
    return gulp.src( "index.js" )
    .pipe( webpack( esConfig ) )
    .pipe( gulp.dest( "build/" ) );
} );

gulp.task( "eslint", () => {
    return gulp.src( [ "**/*.js", "!node_modules/**", "!build/**" ] )
    .pipe( gulpif( args.verbose, gulpprint() ) )
    .pipe( eslint( { "fix": true } ) )
    .pipe( eslint.format() )
    .pipe( eslint.failAfterError() );
} );

gulp.task( "serve", [ "eslint" ], () => {
    spawn( "node", [ "index.js" ], { "stdio": "inherit" } );
} );

gulp.task( "copy-config", () => {
    const config = gulp.src( [ "config/**/*" ] ).pipe( gulp.dest( "build/config" ) );
    const packageJson = gulp.src( [ "package.json" ] ).pipe( gulp.dest( "build" ) );

    return Promise.all( [ config, packageJson ] );
} );

gulp.task('develop', function () {
    let stream = nodemon({ script: 'index.js', ext: 'html js', ignore: ['ignored.js']});
   
    stream
        .on('restart', function () {
          console.log('restarted!')
        })
        .on('crash', function() {
          console.error('Application has crashed!\n')
           stream.emit('restart', 10)  // restart the server in 10 seconds 
        })
  });