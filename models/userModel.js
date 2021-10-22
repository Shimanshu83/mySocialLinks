const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_social_link : {
        unique : true,
        required : true , 
        type : String
    },
    email : {
        unique : true,
        required : true , 
        type : String
    }, 
    password : {
        required : true, 
        type : String 
    }
},{ timestamps: true })

module.exports = mongoose.model("user" , userSchema); 
