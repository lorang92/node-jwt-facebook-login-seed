const https = require('https');
var facebookConfig = require('../../../config/facebook.config');
var request = require('request');


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
            else return res.status(200).json({object: parsed});
        });


    },

    getFbUserById: function (id, callback) {
        var options = {
            uri: 'graph.facebook.com/v2.7/' + id + '?fields=name',
            port: 443,
            method: 'GET',
            headers: {
                Authorization: facebookConfig.APP_TOKEN
            }
        };

        request(options, function (error, response, body) {
            callback(error, response,body);
        });



    }
};