var express = require('express');

const passport = require('passport');
const initialRegisterCheck = require('../controller/initialRegisterCheck');
const register = require('../controller/register');
const socialLinkController = require('../controller/socialLinkController');
var router = express.Router();
const userAuthentication = require('../controller/loginController'); 


router.post('/register' , initialRegisterCheck , register); 

router.post('/login' , userAuthentication); 

router.get("/:socialLink" ,socialLinkController );

router.get('/' , (req ,res ) =>{
  return res.send("welcome to the server of my social links ") ; 
})

module.exports = router;
