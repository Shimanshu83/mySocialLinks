var express = require('express');

const socialLinkController = require('../controller/socialLinkController');

var router = express.Router();
router.get("/:socialLink" ,socialLinkController );
module.exports = router ; 