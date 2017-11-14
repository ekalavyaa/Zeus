const app = require('./server');
const helmet = require('helmet');
const router = require('../routes/router');
const express = require('express');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());  
app.use(helmet.noCache());
app.use('/', router);
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
    throw reason; // optional, in case you want to treat these as errors
});
module.exports = app;