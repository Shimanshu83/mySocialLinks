const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    userId : {
        type : String, 
        required : true 
    },
    name : {
        type : String, 
        required : true 
    },
    link : {
        type : String , 
        required : true , 
    }
    
},{ timestamps: true })

module.exports = mongoose.model("link" , linkSchema); 
