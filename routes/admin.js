var express = require('express');

const isAuth = require('../middleware/isAuthenticated');
const { profileHandler, fileUpload, getProfile} = require('../controller/profileHandler');
const {
    getLinks,
    createLink,
    updateLink,
    deleteLink
} = require('../controller/linksController');
const { route } = require('.');

var router = express.Router();

router.post('/profile', isAuth, fileUpload.single('profileImage'), profileHandler);
router.get('/profile' , isAuth , getProfile); 

router.get('/links', isAuth, getLinks);

router.post('/links', isAuth, createLink);

router.put('/links/:id', isAuth, updateLink);

router.delete('/links/:id', isAuth, deleteLink);

module.exports = router;