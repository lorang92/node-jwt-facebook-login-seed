var userRepository = require('../repository');


module.exports =  {
    findAllUsers: function(req, res, next) {
        userRepository.findAllUsers(function(err, users) {
            if(err)return res.status(500).send();
            if(!users) return res.status(404).send();
            req.data = {};
            req.data.users = users;
            next();
        });
    },
    returnSuccessWithAllUsers: function(req, res, next) {
        return res.status(200).json({users: req.data.users});
    }
};