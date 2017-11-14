const Sequelize = require( "sequelize" );
const config = require( "config" );
const dbConfig = config.get( "mysql" );
const sequelize = new Sequelize( dbConfig.name, dbConfig.user, dbConfig.password, {
    "dialect": "mysql",
    "port": parseInt( dbConfig.port, 10),
    "host": dbConfig.host,
    "operatorsAliases": Sequelize.Op,
    "logging": dbConfig.log
} );
let db = {};

sequelize.authenticate().then( () => {
    console.log( `Mysql connected to ${dbConfig.name}` );
} ).catch( ( err ) => {
    console.error( "Unable to connect to the database:", err );
} );



db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db exports
module.exports = db;
