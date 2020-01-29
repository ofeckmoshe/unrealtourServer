const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Om8988490',
    database: 'realtor',
    multipleStatements:true
});

module.exports = connection;