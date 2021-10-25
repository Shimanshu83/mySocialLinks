const linkModel = require('../models/linkModel') ; 

const getLinks = async (req , res , next)=>{
    try{
    const links = await linkModel.find({userId : req.user.id});
    // the function return empty array if it does not find any data 
    
    const result = links.map(data=> {
        return {id : data.id , name : data.name , link : data.link }
    });

    res.status(200).send({
        success : true,   
        totalLink : result.length ,
        data : result   
    });

    }
    catch(err){
        res.status(500).send({err : err})
    }

}



const createLink = async (req , res , next) =>{
    
    const {name , link} = req.body ;  

    if (!(typeof name === 'string' && typeof link === 'string')){
        
        return res.status(400).send({
            err : "all fields  are required required"
        });      
    }

    try {

        var newLink  = new linkModel({
            userId : req.user.id ,  
            name : name , 
            link : link 
        });

        newLink = await newLink.save();

        return res.status(201).send({
            success : true,
            data : {
                id : newLink.id ,
                name : newLink.name ,
                link : newLink.link      
            }

        })
    }
    catch (err) {
        return res.status(500).send({err}); 
    }
}

const updateLink = async (req , res , next) =>{
    console.log("i am in update link");

    const {name , link } = req.body ; 
    const filter = {id : req.params.id};
    const update = {
        name : name ,    
        link : link 
    }
    try {
    const updatedLink = await linkModel.findOneAndUpdate(filter , update , {new : true });
    res.status(201).send({sucess : true , msg : "successfully updated" , data : {id  :updatedLink.id , name : updatedLink.name , link : updatedLink.link} });
    }
    catch(err){
        return res.status(500).send({err : "internal server error "})
    }

}

const deleteLink = async (req , res ,next) =>{
    try{
        let deleted = await linkModel.findByIdAndDelete(req.params.id);
        res.status(201).send({sucess : true , msg : "successfully deleted"});
    }
    catch(err){
        res.status(500).send({err : "internal server error"})
    }
}

module.exports = {
    getLinks ,
    createLink,  
    updateLink , 
    deleteLink 
}