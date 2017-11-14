const repository = require('../repository/mysql.repo');
const mysqlDb = require('../../../database/mysql');
let findUsers = async () => {
    let result = {};
    for(let i =0; i<1000; i+=1) { 
        let query = 'select * from users';
        result[i] = repository.rawQuery(query, {
                type:mysqlDb.sequelize.QueryTypes.SELECT
            });
         
    }
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