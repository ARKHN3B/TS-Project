"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// # 1) Importation de seulement ce que l'on a besoin de 'express'
const express_1 = require("express");
// # 2) On assigne une variable 'router' à l'instance express.Router()
const router = express_1.Router();
// # 3.1) Le '/' ici correspond à la route sur laquelle 'welcomeController' est monté. Dans ce cas, c'est '/welcome'
router.get('/', (req, res) => {
    // # 3.2) Renvoit un "Hello World" lorsqu'aucun paramètre n'est donné 
    res.send('Hello World !');
});
router.get('/:name', (req, res) => {
    // # 4.1) Ici, on récupère l'élément renvoyé dans l'URL
    let { name } = req.params;
    // # 4.2) On affiche le nom de cet élément
    res.send(`Hello, ${name}`);
});
// # 5) On export l'instance d'express.Router() qui sera utilisée par 'server.ts'
exports.WELCOMECONTROLLER = router;
//# sourceMappingURL=welcomeController.js.map