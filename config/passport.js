const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel.js');
const validPassword = require('../util/passwordUtils').validPassword;

// TODO: passport.use();



const customFields = {
    usernameField: 'email',
    passwordField : 'password'
};
// if we name our form field different than username , password we need to change the
// the customField 

const verifyCallback = (username , password , done) => {
    // the callback automatically take this username and password from the req.body field 
    console.log(username , password)
    User.findOne({ email: username })
            .then((user) => {

                if (!user) { return done(null, false) } //the donw callback function first parm error and second is wheter user exists 

                
                // Function defined at bottom of app.j
                const isValid = validPassword(password, user.password);              
                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            })
            .catch((err) => {   
                done(err);
            });
}
// can add custom fields first 
const localStrategy = new LocalStrategy(customFields ,  verifyCallback);

passport.use(localStrategy); 


// happening something for sessions 

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

//deleting sessions 
passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});