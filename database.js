const {createPool, createConnection} = require("mysql");

const pool = createConnection({
    port : 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "sakhafinance"
    
});

module.exports  =  
    pool;