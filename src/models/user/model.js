var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    fbId: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('user', userSchema);
