const linkModel = require('../models/linkModel') ; 
const asyncHandler = require('express-async-handler')

const getLinks = asyncHandler(async (req , res , next)=>{
    try{
    const links = await linkModel.find({userId : req.user.id}).sort({createdAt: 'desc'});
    
    const result = links.map(data=> {
        return {id : data.id , name : data.name , link : data.link }
    });

    res.status(200).send({
        status : true,   
        totalLink : result.length ,
        data : result   
    });

    }
    catch(err){
        console.error(err);
        res.status(400); 
        throw new Error("All Fields are required"); 
    }

})



const createLink = asyncHandler( async (req , res , next) =>{
    
    const {name , link} = req.body ;  

    if (!(typeof name === 'string' && typeof link === 'string')){
       
        res.status(400); 
        throw new Error("All Fields are required");       
    }

    try {

        var newLink  = new linkModel({
            userId : req.user.id ,  
            name : name , 
            link : link 
        });

        newLink = await newLink.save();

        return res.status(201).send({
            status : true,
            data : {
                id : newLink.id ,
                name : newLink.name ,
                link : newLink.link      
            }

        })
    }
    catch (err) {
        console.error(err);
        res.status(500)
        throw new Error("Internal Server Error");
    }
})

const updateLink = asyncHandler( async (req , res , next) =>{
    const {name , link } = req.body ; 
    console.log(req.params.id , 'params')
    const filter = {_id : req.params.id};
    const update = {
        name : name ,    
        link : link 
    }
    try {
    const updatedLink = await linkModel.findOneAndUpdate(filter , update );
    console.log(updatedLink);
    res.status(201).send({status : true , msg : "successfully updated" , data : {id  :updatedLink._id , name : updatedLink.name , link : updatedLink.link} });
    }
    catch(err){
        console.error(err);
        res.status(500); 
        throw new Error("Internal server error"); 
    }

})

const deleteLink = async (req , res ,next) =>{
    try{
        let deleted = await linkModel.findByIdAndDelete(req.params.id);
        res.status(201).send({status : true , msg : "successfully deleted"});
    }
    catch(err){
        console.error(err);
        res.status(500); 
        throw new Error("Internal server error");
    }
}

module.exports = {
    getLinks ,
    createLink,  
    updateLink , 
    deleteLink 
}