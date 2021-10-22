var express = require('express');

const isAuth = require('../controller/isAuth');
const {profileHandler , fileUpload} = require('../controller/profileHandler');


var router = express.Router();

router.post('/profile' , fileUpload.single('profileImage') ,profileHandler);

router.post('/addlink',isAuth ,(req , res ) => {
    res.send("you are in protected route");
});

module.exports = router;
