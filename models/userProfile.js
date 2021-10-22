const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    userId_ : {
        type : String 
    },
    imgAddresh : {
        type : String,
    },
    title : { 
        type : String
    }, 
    description : { 
        type : String 
    }
},{ timestamps: true })

module.exports = mongoose.model("profile" , profileSchema); 
