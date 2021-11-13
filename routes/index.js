var express = require('express');

const passport = require('passport');
const initialRegisterCheck = require('../controller/initialRegisterCheck');
const register = require('../controller/register');
const socialLinkController = require('../controller/socialLinkController');
var router = express.Router();



router.post('/register' , initialRegisterCheck , register); 

router.post('/login',passport.authenticate('local',{ failureRedirect: '/login-failure', successRedirect: '/login-success'})); 

router.use('/login-failure' , (req , res ) =>{
  return res.send("failure occured sir") ; 
})


router.use('/login-success' , (req , res ) =>{
  return res.send("you are succeeded") ; 
})

router.get("/:socialLink" ,socialLinkController );

module.exports = router;
