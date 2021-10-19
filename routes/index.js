var express = require('express');

const passport = require('passport');
const initialRegisterCheck = require('../controller/initialRegisterCheck');
const register = require('../controller/register');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register' , initialRegisterCheck , register); 

router.post('/login',passport.authenticate('local',{ failureRedirect: '/login-failure', successRedirect: '/login-success'})); 

router.use('/login-failure' , (req , res ) =>{
  return res.send("failure occured sir") ; 
})


router.use('/login-success' , (req , res ) =>{
  console.log(req.isAuthenticated)
  console.log(req.session.passport.name  = "jai bheem")
  return res.send("you are succeeded") ; 
})

// user page   
router.get('/:username',() => {
  
}); 

module.exports = router;
