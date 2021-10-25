const linkModel = require('../models/linkModel');
const userModel = require('../models/userModel');
const profileModel = require('../models/userProfile');

const socialLinkController = async (req, res, next) =>{
    console.log("i am in social link controller")
    var socialLink = req.params.socialLink ; 

    var user = await userModel.findOne({user_social_link : socialLink})
    if (!user){
        res.status(500).send("user does not exist"); 
    }

    var userId = user.id ; 
    
    var profile = await profileModel.findOne({userId_ : userId});
    if (!profile){
        res.status(500).send("profile does not exist"); 
    }
    
    var links = await linkModel.find({userId : userId});
    var options =  {
        imgAddresh : profile.imgAddresh ,
        title : profile.title ,  
        description : profile.description ,
        links : links
    }

    console.log(options); 
    return res.render("socialLink" ,options);


}



module.exports = socialLinkController;
