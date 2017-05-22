var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    fbToken:{type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);