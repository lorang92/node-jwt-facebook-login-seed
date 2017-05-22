var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var authenticationRouter = require('./routes/authentication/index');
var userRouter = require('./routes/user/index');

var dbConfig = require('./config/db.config');
var serverConfig = require('./config/server.config')

if (mongoose.connection.readyState === 0) {
    mongoose.connect(dbConfig.DATABASE.test, function (err) {
        if (err) console.log(err);
        else console.log('Successfully connected to: ' + dbConfig.DATABASE.test);
    });
};

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(function (err, req, res, next) {
    if (res.headersSent) return;
    return res.status(err.status || 500).message(err.message || "");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//init routers
app.use('/', userRouter);
app.use('/', authenticationRouter);



app.listen(serverConfig.PORT, function () {
    console.log('Server is now listening at port ' + serverConfig.PORT);
});