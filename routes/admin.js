var express = require('express');

const isAuth = require('../middleware/isAuthenticated');
const {profileHandler , fileUpload} = require('../controller/profileHandler');
const {getLinks ,
    createLink,  
    updateLink , 
    deleteLink } = require('../controller/linksController'); 

var router = express.Router();

router.post('/profile' , fileUpload.single('profileImage') ,profileHandler);

router.get('/links',isAuth ,getLinks );

router.post('/links',isAuth ,createLink );

router.put('/links/:id',isAuth ,updateLink );

router.delete('/links/:id',isAuth ,deleteLink );

module.exports = router;
