const express = require('express');
const router = new express.Router();
const userCon = require('./rest/user/user.controller');
const validationRules = require('./validation/validaion.rules');
const validate = require('./middlewares/validation').validate;

//api goes here

//user related
router
 .get('/user/:userId', validate(validationRules.getAll), userCon.getAll)
 .post('/login', userCon.login);

//exports all apis
module.exports = router;