"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// # 7.1) Importation - de tout - d'express et assignation à une variable 'express'
const express = require("express");
//  ●-▶ # 1.1) Importation - de tout - de mysql et assignation à une variable 'mySQL'
//           En JS, revient à dire : var mySQL = require('mysql');
const mySQL = require("mysql");
//  ●-▶ # 2.1) Importation - de tout - de body-parser et assignation à une variable 'BodyParser'
//             Permet de récupérer les datas dans la requête : POST, GET...
const BodyParser = require("body-parser");
// # 7.2) Importation de WELCOMECONTROLLER à partir de son point d'entrée
const controllers_1 = require("./controllers");
// # 8) Création d'une nouvelle instance de l'application express
const app = express();
// # 9) Le port sur lequel l'app express va être écouté :
const port = process.env.port || 3088;
//  ●-▶ # 1.2) Require sur le module mysql
exports.connection = mySQL.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'WINESTS'
});
// ●-▶ # 2.2) On demande à express d'utiliser body-parser.
app.use(BodyParser.urlencoded({ extended: false }));
// ●-▶ # 3) Permet l'accès au server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// # 10) Monte le 'MyController' sur la route : /winests
app.use('/winests', controllers_1.myCONTROLLER);
// # 11) Démarre l'app (/server) sur le port donné :
app.listen(port, () => {
    // Success return
    console.log(`Listening at the port : ${port}`);
});
//# sourceMappingURL=server.js.map