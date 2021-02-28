const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const booksSchema = new Schema({
    Picture: String,
    Name: String,
    Author:String,
    Price: Number,
    Description: String,
});

module.exports = mongoose.model('books',booksSchema)