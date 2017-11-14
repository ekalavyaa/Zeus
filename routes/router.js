let express = require('express'),
 router = new express.Router();

//api goes here
router.get('/', (req, res) => {
    res.json({'message':"hello world"});
 });

//exports all apis
module.exports = router;