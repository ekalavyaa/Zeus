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

exports.login = async (body) => {
    let query = 'select * from users where email = :email';
    let user = await repository.rawQuery(query, {
        replacements: {
            email:body.email
        },
        type:mysqlDb.sequelize.QueryTypes.SELECT
    });
    if(!user[0] || !user.length || !user[0].password === body.password) {
        throw new Error('Invalid credentials'); 
    }
    return user[0];
};