var express = require('express');

const isAuth = require('../controller/isAuth');

var router = express.Router();

router.post('/profile' , isAuth ,(req , res ) => {
    res.send("you are in protected route");
});

router.post('/addlink',isAuth ,(req , res ) => {
    res.send("you are in protected route");
});

module.exports = router;
