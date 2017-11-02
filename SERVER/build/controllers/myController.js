"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// # 1) Importation de seulement ce que l'on a besoin de 'express'
const express_1 = require("express");
const Service_1 = require("../class/Service");
const server_1 = require("../server");
// # 2) On assigne une variable 'router' à l'instance express.Router()
const router = express_1.Router();
// # 3.1) Le '/' ici correspond à la route sur laquelle 'welcomeController' est monté. Dans ce cas, c'est '/welcome'
router.get('/', (req, res) => {
    // # 3.2) Renvoit un "Hello World" lorsqu'aucun paramètre n'est donné 
    res.send('Hello World !');
});
// ☁ no use
router.get('/name/:name', (req, res) => {
    // # 4.1) Ici, on récupère l'élément renvoyé dans l'URL
    let { name } = req.params;
    // # 4.2) On affiche le nom de cet élément
    res.send(`Hello, ${name}`);
});
// ☁ no use
router.get('/test/:username/:password', (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    let service = new Service_1.Service(server_1.connection);
    service.checkUsernamePassword(req, res, (data) => {
        // On utilise une callback pour afficher la réponse sur la page
        // res.json(data);
        if (!(data.length == 0))
            res.json(data);
        else
            res.send('not ok because data is empty');
    });
});
// use
router.post('/checkUserExist', (req, res) => {
    let service = new Service_1.Service(server_1.connection);
    service.checkIfUserExist(req, res, (data) => {
        if (!(data.length == 0))
            res.json(data);
        else
            res.send(false);
    });
});
// ☁ no use
router.get('/getCategoriesByUserID/:userID', (req, res) => {
    let service = new Service_1.Service(server_1.connection);
    let promise = service.getVendorByUserID(req, res);
    promise.then((data) => {
        let datas = [];
        let products = [];
        data.forEach((element) => {
            datas.push(element.productID);
        });
        new Promise((resolve, reject) => {
            let i = 0;
            datas.forEach((element) => {
                let ppromise = service.getProductByID(element);
                ppromise.then((data) => {
                    i++;
                    products.push(data);
                    if (i == datas.length)
                        resolve(products);
                });
            });
        }).then((products) => {
            console.log(products);
        });
    });
});
// use
router.get('/categoriesUser/:userID', (req, res) => {
    let service = new Service_1.Service(server_1.connection);
    let servicePromise = service.getProductbyUserID(req.params.userID);
    servicePromise.then((datas) => {
        let catID = [];
        datas.forEach((element) => {
            let categoryID = element.categoryID;
            // Si l'élément ne se trouve pas dans le tableau
            if (catID.indexOf(categoryID) == -1) {
                catID.push(categoryID);
            }
        });
        let catPromise = service.getCategoriesbyID(catID);
        catPromise.then((datas) => {
            res.send(datas);
        });
    });
});
router.get('/productVendor/:userID', (req, res) => {
    let service = new Service_1.Service(server_1.connection);
    let servicePromise = service.getProductsByCat(req.params.userID);
    servicePromise.then((data) => {
        res.json(data);
    });
});
router.get('/product/:productID', (req, res) => {
    let service = new Service_1.Service(server_1.connection);
    let servicePromise = service.getProductByID(req.params.productID);
    servicePromise.then((data) => {
        res.json(data);
    });
});
// # 5) On export l'instance d'express.Router() qui sera utilisée par 'server.ts'
exports.myCONTROLLER = router;
//# sourceMappingURL=myController.js.map