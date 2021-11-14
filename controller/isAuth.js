var isAuth = (req , res , next ) => {

    if(req.isAuthenticated()){
        next(); 
    }
    else{
        console.log(req.isAuthenticated())
        res.status(401).json({msg:'you are not authorized to view this resourc '})
    }
}


module.exports = isAuth ; 