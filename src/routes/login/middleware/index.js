const jwt = require('jsonwebtoken');
var serverConfig = require('../../../config/server.config');

var middleware = {
    authenticate: function(req, res, next) {
        if(!req.header('Authorization')) return res.status(401).json({message: 'Access Token was not provided.'});

        jwt.verify(req.header.('Authorization', serverConfig.SECRET, function(err, verified) {
            if (err) return res.status(500).send();
            if (!verified) return res.status(401).json({message: 'You supplied an invalid access token.'});
            req.verified = verified;
            next();
        }));
    },



}

module.exports = middleware;