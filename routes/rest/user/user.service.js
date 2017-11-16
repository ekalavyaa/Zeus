const repository = require('../repository/mysql.repo');
const mysqlDb = require('../../../database/mysql');
let findUsers = async () => {
    let query  = 'select * from users';
    let result = await repository.rawQuery(query, {
            type:mysqlDb.sequelize.QueryTypes.SELECT
        });
    return result;
};

let countUsers = async () => {
    let query = 'select count(*) from users';
    let result = await repository.rawQuery(query, {
        type:mysqlDb.sequelize.QueryTypes.SELECT
    });
    return result;
};

exports.getUsersWithCount = async () => {
    let users = await findUsers();
    let count = await countUsers();
    return { users: users, count: count };
};