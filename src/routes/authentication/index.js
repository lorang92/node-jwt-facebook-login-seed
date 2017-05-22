var userModel = require('../../models/user/model');
var express = require('express');
var middleware = require('./middleware/index');

var router = express.Router();

router.post('/authenticateByFbToken',
    middleware.fetchUserFromFB,
    middleware.findUserObjectOrCreateNew,
    middleware.signToken,
    middleware.returnSuccessWithTokens
);

router.post('/validateAccessToken',
    middleware.authenticate,
    middleware.returnSuccessfullValidation
);

module.exports = router;

