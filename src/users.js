const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    Username: String,
    Password: String,
});

module.exports = mongoose.model('users',usersSchema)