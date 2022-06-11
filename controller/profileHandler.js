const multer = require('multer');
const path = require('path');
const url = require('url');

const UserProfileModel = require("../models/userProfile")

const fileStorage = multer.diskStorage({
    destination: 'public/images', // Destination to store image 
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9 )}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
            // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1000000 * 100 // 1000000 Bytes = 100 MB
    }
})

// { profilImg , name , description}
const getProfile = async(req, res, next) => {
    const userId = req.user.id;
    try {
        const link = await UserProfileModel.find({ userId_: userId });
        if (link.length == 0) {
            return res.status(200).send({ status: false, message: "Profile is not created" })
        };
        // const user = await UserModel.find({userId_ : userId})


        return res.send({
            status: true,
            data: {
                profileData: {
                    profileId: link[0]._id,
                    profileImage: link[0].imgAddresh,
                    title: link[0].title,
                    description: link[0].description
                }
            }
        })
    } catch (err) {

        res.status(500).send({ status: false, message: "An Unknown error occured" });
    }
    // const profileId = url.parse(req.url , true).query;
}

const profileHandler = async(req, res, next) => {

    var { title, description } = req.body;
    const userId = req.user.id;
    let profileExist = false;
    try {
        const profile = await UserProfileModel.find({ userId_: userId });
        if (profile.length > 0) {
            profileExist = true;
        }

    } catch (err) {
        console.error(err);
    }

    if (profileExist) {

        const filter = { userId_: userId }
        const update = {
            title: title,
            description: description,
            imgAddresh: req.file?.filename
        }
        try {
            const updatedLink = await UserProfileModel.findOneAndUpdate(filter, update, { new: true });
            return res.send({
                status: true,
                data: {
                    profileData: {
                        profileId: updatedLink._id,
                        profileImage: updatedLink.imgAddresh,
                        title: updatedLink.title,
                        description: updatedLink.description
                    }
                }
            })

        } catch (error) {
            return res.status(500).send({ status: false, message: "Profile Updation Failed" })

        }

    }

    try {

        var createdProfile = new UserProfileModel({
            userId_: req.user.id,
            imgAddresh: req.file?.filename,
            title: title,
            description: description
        })
        createdProfile = await createdProfile.save();
        return res.send({
            status: true,
            data: {
                profileData: {
                    profileId: createdProfile._id,
                    profileImage: createdProfile.imgAddresh,
                    title: createdProfile.title,
                    description: createdProfile.description
                }
            }
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Profile Creation Failed" })
    }

}

module.exports = { profileHandler, fileUpload, getProfile }