var User = require('../../models/user/model');

module.exports = {

    findAllUsers: function(callback) {
        User.find({}, function(err, users) {
            callback(err, users);
        })
    },

    createUser: function(name,fbId, callback) {
        User.create({name: name, fbId: fbId}, function(err,user) {
            callback(err, user);
        });
    },

    findUserByFbId: function(fbId, callback) {
        User.findOne({fbId: fbId}, function (err, user) {
            callback(err,user);
        })
    }
};