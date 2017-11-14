let app = require('./server'),
 helmet = require('helmet'),
 router = require('../routes/router'),
 express = require('express'),
 path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());  
app.use(helmet.noCache());
app.use('/', router);
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
    throw reason; // optional, in case you want to treat these as errors
});
module.exports = app;