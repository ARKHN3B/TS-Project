import * as mySQL from 'mysql';

const connection: mySQL.Connection = mySQL.createConnection({
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'WINESTS'
});

let query: string = "SELECT * FROM users";

connection.query(query, (error, result, fields) => {
    console.log('test');
    console.log(result);
    console.log(error);
    console.log(fields);
});