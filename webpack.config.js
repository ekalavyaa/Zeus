let webpack = require( "webpack" ),
path = require( "path" ),
fs = require( "fs" ),
UglifyJSPlugin = require( "uglifyjs-webpack-plugin" ),
nodeModules = {};

fs.readdirSync( "node_modules" )
	.filter( ( x ) => {
    return [ ".bin" ].indexOf( x ) === -1;
} )
	.forEach( ( mod ) => {
    nodeModules[ mod ] = `commonjs ${ mod}`;
} );

module.exports = {
    "target": "node",
    "node": {
        "console": false,
        "global": false,
        "process": false,
        "Buffer": false,
        "__filename": true,
        "__dirname": true
    },

    "entry": "./index.js",

    "output": {
        "path": path.join( __dirname, "build" ),
        "filename": "bundle.js"
    },

    "externals": nodeModules,
    "plugins": [
        new webpack.IgnorePlugin( /\.(css|less)$/ ),
        new webpack.BannerPlugin( { "banner": 'require("source-map-support").install();', "raw": true, "entryOnly": false } ),
        new UglifyJSPlugin( {
            "warningsFilter": () => true
        } )
    ],
    "devtool": "sourcemap",

    "module": {
        "loaders": [
			{ "test": /\.json$/, "loader": "json-loader" }
        ]
    }
};
