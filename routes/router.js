const express = require('express');
const router = new express.Router();
const userCon = require('./rest/user/user.controller');
const validationRules = require('./validation/validaion.rules');
const validate = require('./middlewares/validation').validate;

//api goes here
router.get('/user/:userId', validate(validationRules.getUser), userCon.getOne);

//exports all apis
module.exports = router;