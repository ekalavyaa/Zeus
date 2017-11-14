"use strict" ;
const gulp = require( "gulp" );
let webpack = require( "webpack-stream" ),
 eslint = require( "gulp-eslint" ),
 gulpif = require( "gulp-if" ),
 args = require( "yargs" ).argv,
 gulpprint = require( "gulp-print" ),
 spawn = require( "child_process" ).spawn,
 esConfig = require( "./webpack.config.js" );

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
    let config = gulp.src( [ "config/**/*" ] ).pipe( gulp.dest( "build/config" ) ),
     packageJson = gulp.src( [ "package.json" ] ).pipe( gulp.dest( "build" ) );

    return Promise.all( [ config, packageJson ] );
} );
