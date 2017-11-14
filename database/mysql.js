"use strict";
let Sequelize = require( "sequelize" ),
 config = require( "config" ),
 dbConfig = config.get( "mysql" ),
 db = {};

const sequelize = new Sequelize( dbConfig.name, dbConfig.user, dbConfig.password, {
    "dialect": "mysql",
    "port": parseInt( dbConfig.port ),
    "host": dbConfig.host,
    "operatorsAliases": Sequelize.Op,
    "logging": dbConfig.log
} );

sequelize.authenticate().then( () => {
    console.log( `Mysql connected to ${dbConfig.name}` );
} ).catch( ( err ) => {
    console.error( "Unable to connect to the database:", err );
} );



db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db exports
module.exports = db;
