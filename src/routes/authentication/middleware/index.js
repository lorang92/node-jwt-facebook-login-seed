var request = require('request');
var jwt = require('jsonwebtoken');
var userRepository = require('../../user/repository');
var serverConfig = require('../../../config/server.config');


module.exports = {


    getFbIdAndNameByToken: function (token, callback) {

        request.get('https://graph.facebook.com/me?access_token=' + token, function (error, response, body) {
            callback(error, response, JSON.parse(body));

        });
    },

    fetchUserFromFB: function (req, res, next) {
        if (!req.body.fbToken) return res.status(401).send();

        module.exports.getFbIdAndNameByToken(req.body.fbToken, function (error,response, parsed) {
            if(error) return res.status(500).json({message: error.message});
            if(!parsed) return res.status(404).send({message: 'not found?'});
            req.data = {};
            req.data.user = parsed;
            next();
        });


    },

    findUserObjectOrCreateNew: function(req, res, next) {
        userRepository.findUserByFbId(req.data.user.id, function(err, user) {
            if(err) return res.status(500).send();
            if (!user) {
                //the user does not exist, create a user object for the given facebook-id
                userRepository.createUser(req.data.user.name, req.data.user.id, function(err, newUser) {
                    if(err || !newUser) return res.status(500).send();
                    req.data.user = newUser;
                    console.log('inside created new user');
                    console.log('user:' + newUser);

                    next();
                });
            }
            else {
                //The user already exists, all good
                req.data.user = user;
                next();
            }
        })
    },

    authenticate: function(req, res, next) {
        if(!req.header('Authorization')) return res.status(401).json({message: 'Access token was not provided.'});

        jwt.verify(req.header('Authorization'), serverConfig.SECRET, function(err, verified) {
            if (err) return res.status(500).send();
            if (!verified) return res.status(401).json({message: 'You supplied an invalid access token.'});
            req.verified = verified;
            next();
        });
    },

    signToken: function(req, res, next) {
        if(!req.data.user) {
            return res.status(401).send();
        }
        var payload = {
            userId: req.data.user.id
        };
        jwt.sign(payload, serverConfig.SECRET, {expiresIn: 24*60*60}, function(err, token) {
            if(err) return res.status(500).send();
            req.data.tokens = {
                accessToken: token
            };
            next();
        });
    },

    returnSuccessfullValidation: function(req, res, next){
        return res.status(200).json({message: 'access token is valid.'});
    },

    returnSuccessWithTokens: function(req, res, next) {
        res.status(200).send({tokens: req.data.tokens});
    }
};