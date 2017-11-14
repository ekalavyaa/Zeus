let express = require('express');
const router = new express.Router();
const userCon = require('./rest/user/user.controller');

//api goes here
router.get('/:userId', userCon.getOne);

//exports all apis
module.exports = router;