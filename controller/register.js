const User = require('../models/userModel');
const { genPassword } = require('../util/passwordUtils')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async(req, res) => {
    const { user_social_link, email, password } = req.body;

    try {
        //user_social_link must be unique  
        var user_social_link_exist = await User.findOne({ user_social_link: user_social_link });
        if (user_social_link_exist) {
            console.log('thi')

            return res.status(401).send({
                status: false,
                message: 'user_social_link already exits'
            })
        }

        const alreadyExist = await User.findOne({ email: email })

        if (alreadyExist) {

            return res.status(401).send({
                status: false,
                message: 'Email already exits'
            })

        } else {
            const passwordHash = genPassword(password);
            var user = new User({
                user_social_link: user_social_link,
                email: email,

                password: passwordHash
            })

            try {
                const payload = {
                    email: user.email,
                    id: user._id
                }

                user = await user.save();
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100000000s' });
                return res.status(201).send({
                    status: true,
                    data: {
                        user: {
                            email: user.email,
                            user_social_link: user.user_social_link,
                            token: token
                        }
                    }
                })

            } catch (error) {

                if (error) {
                    console.error(error, 'first');
                    res.status(500);
                    throw new Error('Something went wrong');
                }
            }


        }
    } catch (error) {
        console.error(error, 'second');
        res.status(500);
        throw new Error('Something went wrong');
    }
})
module.exports = register;