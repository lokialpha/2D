const mongoose = require('mongoose');
const User = require('./userModel.js')
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    Number : {
        type : Number,
        required : true
    },
    Amount : {
        type : Number,
        required : true
    },
    ScreenShots : {
        type : String,
        required : true
    },
    User : {
        type : Schema.Types.ObjectId,
        ref : User,
        required : true
    }
},{timestamps: true});

const Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;