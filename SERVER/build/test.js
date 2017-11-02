"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL = require("mysql");
const connection = mySQL.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'WINESTS'
});
let query = "SELECT * FROM users";
connection.query(query, (error, result, fields) => {
    console.log('test');
    console.log(result);
    console.log(error);
    console.log(fields);
});
//# sourceMappingURL=test.js.map