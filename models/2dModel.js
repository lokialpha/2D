const mongoose = require('mongoose');
const User = require('./userModel.js')
const Schema = mongoose.Schema;
const twoDSchema = new Schema({
    number : {
        type : Number,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    screenShots : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : User,
        required : true
    }
},{timestamps: true});

const Blog = mongoose.model("Blogs",twoDSchema);
module.exports = Blog;