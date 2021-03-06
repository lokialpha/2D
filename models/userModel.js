const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        unique : true,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    isAdmin : {
        type : Boolean,
        required : true,
        default : false,
    },

    avatar : {
        type : String,
        required : true,
    },

    tokens : [
        {
            token : {
                type : String,
                required : true,
            },
        },
    ],
},{ timestamps : true });


const User = mongoose.model("User", userSchema);

module.exports = User;