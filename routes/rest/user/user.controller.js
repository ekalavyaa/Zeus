const userService = require('./user.service');
const jsonResponse = require('../../response_generator/generation.functions');

exports.getAll = (req, res) => {
    userService.getUsersWithCount(req.params.userId)
    .then((data) => {
        return res.json(jsonResponse.success('user feteched success', data));
    }).catch(e => {
        console.log(e);
        return res.json(jsonResponse.failure(e.message));
    });
}
    
exports.login = (req, res) => {
    userService.login(req.body)
    .then(data => {
        return res.json(jsonResponse.success('user login', data));
    }).catch(e => {
        console.log(e);
        return res.json(jsonResponse.failure(e.message));
    });
};