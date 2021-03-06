var userModel = require('../../models/user/model');
var express = require('express');
var middleware = require('./middleware/index');

var router = express.Router();

router.get('/users',
    middleware.findAllUsers,
    middleware.returnSuccessWithAllUsers
);

module.exports = router;