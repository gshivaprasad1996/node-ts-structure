import mysql = require('mysql');
import { Connection } from 'mysql';

const con: Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test_db',
});

async function Test() {
    await con.connect();
    con.query(`SELECT * FROM users;`, (err, result) => {
        if (err) throw err;
        if (result) {
            console.log(result);
        }
    });
}

Test();
