const linkModel = require('../models/linkModel');
const userModel = require('../models/userModel');
const profileModel = require('../models/userProfile');

const socialLinkController = async (req, res, next) =>{
    console.log("i am in social link controller")
    var socialLink = req.params.socialLink ; 

    var user = await userModel.findOne({user_social_link : socialLink})
    if (!user){
        
        res.status(500).send("user does not exist"); 
        return ;
    }

    var userId = user.id ; 
    
    var profile = await profileModel.findOne({userId_ : userId});
    var profileOptions = {}; 
    if (!profile){
        profileOptions = {
        imgAddresh : null ,
        title : user.user_social_link ,  
        description : null  
        }
    }
    else{
        profileOptions = {
            imgAddresh : profile.imgAddresh ,
            title : profile.title ,  
            description : profile.description 
            }
    }
    
    var links = await linkModel.find({userId : userId});
    var options =  {
        ...profileOptions,
        links : links
    }
    console.log(options) ; 

    return res.render( 'socialLink.ejs' , options) ;  

}



module.exports = socialLinkController;
