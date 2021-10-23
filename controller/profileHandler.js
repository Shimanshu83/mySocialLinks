const multer = require('multer');
const path = require('path');

const UserProfileModel = require("../models/userProfile")

const fileStorage = multer.diskStorage({
    destination: 'uploads', // Destination to store image 
    filename: (req, file, cb) => {
        const uniqueName =`${Date.now()}-${Math.round(Math.random() * 1E9 )}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1000000 *100  // 1000000 Bytes = 100 MB
    }
    })  

// { profilImg , name , description}

const profileHandler = async (req ,res ,next) => {
    var {title , description} = req.body ; 
    console.log(req.user)
    var profile =  new UserProfileModel({
        userId_ : req.user.id ,
        imgAddresh : req.file.filename, 
        title : title,     
        description : description
    })
    
    var save = await profile.save();

    res.send({"sucess" : true , data : save});

}

module.exports = {profileHandler , fileUpload}