const userService = require('./user.service');

exports.getOne = (req, res) => {
    userService.getUsersWithCount(req.params.userId)
    .then((data) => {
        return res.json(data);
    }).catch(e => {
        return res.json(e.message);
    });
}
    