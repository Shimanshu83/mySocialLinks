const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler') // simple middleware to handle the exceoption in async handler and use custom handler for it 
const User = require('../models/userModel')
const {emailValidator}  = require('../util/validate')
const {validPassword} = require('../util/passwordUtils')

const userAuthentication = asyncHandler( async (req , res , next ) => {
    const { email , password }  = req.body ;
    


    if(!(typeof email === 'string' && typeof password === 'string')){
        res.status(400);
        throw new Error("All fields are mendatory"); 
    }

    else if(!emailValidator(email)){
        res.status(400);
        throw new Error("Enter Valid Email"); 
    }

    const user = await User.findOne({email : email });

    if(!user){
        res.status(401);
        throw new Error("Email does not exist"); 

    }

    const isValid = validPassword(password , user.password) ; 

    if(!(isValid)){
        res.status(401);
        throw new Error("Wrong password"); 
    }

    const payload = {
        email : user.email ,
        id : user._id 
    }
    
    try {
        const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : `${60*60*24*2*23}s`});
    
        return res.status(200).json( {
            status : true,
            data :
                {
                user : {  email : user.email , user_social_link : user.user_social_link ,token : token }
                } 
            }
        );
            
    } catch (error) {
        res.status(500);
        throw new Error("Something went wrong");  
    }

    
})

module.exports = userAuthentication ;