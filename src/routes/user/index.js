var userModel = require('../../models/user/model');
var express = require('express');
var middleware = require('./middleware/index');

var router = express.Router();

router.post('/login',
    middleware.fetchUserFromFB
);

router.get('/test', function (req, res) {
    return res.status(200).send();
});

module.exports = router;

