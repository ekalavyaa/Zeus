const userService = require('./user.service');
const jsonResponse = require('../../response_generator/generation.functions');
var a =0 ;

exports.getOne = (req, res) => {
    userService.getUsersWithCount(req.params.userId)
    .then((data) => {
        a += 1;
        return res.json(jsonResponse.success('user feteched sucess', data));
    }).catch(e => {
        console.log(e);
        return res.json(jsonResponse.failure(a));
    });
}
    
