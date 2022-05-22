const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    userId : {
        type : String, 
        required : true 
    },
    name : {
        type : String, 
        required : false 
    },
    link : {
        type : String , 
        required : false , 
    }
    
},{ timestamps: true })

module.exports = mongoose.model("link" , linkSchema); 
