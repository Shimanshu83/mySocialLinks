const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler') 

const isAuthenticated = asyncHandler( (req , res , next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        
        if(!token){
            res.status(403) 
            throw new Error("User not authenticated");   
        }
        
        const isCustomAuth = token.length < 500 ; 
        
        let decodedData ; 
        
        if(token && isCustomAuth){
            try {
                console.log("is user authenticated");
                decodedData = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )  ;
                
                req.user = decodedData ; 
                next() ; 
            } catch (error) {
                console.error(error);
                res.status(403) 
                throw new Error("User not authenticated");
            }
            
        }
        else {
            try {
                decodedData = jwt.decode(token)
                req.user.id = decodedData?.sub ; 
                next() ; 
            } catch (error) {
                res.status(403).send({err : "user not authenticated google "})
            }
        }

    } catch (error) {
        
        res.status(403) 
        throw new Error("User not authenticated");
    }
} )


module.exports = isAuthenticated ;  