const User = require('../models/userModel');
const {genPassword} = require('../util/passwordUtils')


const register = async (req, res) => {
    const {  user_social_link ,  email, password  } = req.body;   

    try {


        //user_social_link must be unique  
        var user_social_link_exist = await User.findOne({user_social_link : user_social_link}); 
        console.log(user_social_link_exist)
        if(user_social_link_exist){
            console.log(user_social_link_exist)
            return res.status(401).send("the naasdfasdfasdfme is already taken try another");
        }

        const alreadyExist = await User.findOne({email: email})
    
        if(alreadyExist){

            return res.status(401).send("email already exists");
            
        }
        else{
            console.log('user has been created');
            const passwordHash = genPassword(password);
            var user =  new User(
                {
                    user_social_link : user_social_link , 
                    email : email, 
                    password : passwordHash
                }
            )

            try {
        
                user = await user.save() ;
                return res.status(201).send({
                    sucess : true,
                    msg : "User successfully registerd" , 
                    user : {
                        id : user.id ,
                        email : user.email ,
                        username : user.user_social_link             
                    }
                })
                
            } catch (error) {

                if(error){
                return res.status(500).send({err : error})
            }
            }

            
        }
    } catch (error) {
        console.log(error); 
               return res.status(500).send({err : "some thingh went wrong "});
    }   
}
module.exports = register ; 