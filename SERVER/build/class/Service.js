"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(connection) {
        this.connection = connection;
    }
    getConnection() {
        return this.connection;
    }
    // ☁ no use
    checkUsernamePassword(req, res, callback) {
        const connection = this.getConnection();
        let query = "SELECT * FROM users WHERE username=? AND password=?";
        let array = [req.params.username, req.params.password];
        // error = erreur
        // result = le résultat de la requête
        // fields = les champs de la db + infos
        connection.query(query, array, (error, result, fields) => {
            callback(result);
        });
    }
    // use
    checkIfUserExist(req, res, callback) {
        const connection = this.getConnection();
        let query = "SELECT * FROM users WHERE username=? AND password=?";
        let array = [req.body.username, req.body.password];
        connection.query(query, array, (err, result, fields) => {
            callback(result);
        });
    }
    // ☁ no use
    getVendorByUserID(req, res) {
        const connection = this.getConnection();
        let query = `SELECT * FROM vendors WHERE userID=?`;
        let array = [req.params.userID];
        return new Promise((resolve, reject) => {
            connection.query(query, array, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    // use
    getProductByID(id) {
        const connection = this.getConnection();
        let query = `SELECT * FROM products WHERE id=?`;
        let numb = id;
        return new Promise((resolve, reject) => {
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    // use
    getProductbyUserID(id) {
        const connection = this.getConnection();
        let query = `SELECT products.* FROM products
                            JOIN vendors ON vendors.userID=?
                            WHERE vendors.productID = products.id`;
        let numb = id;
        return new Promise((resolve, reject) => {
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    // use
    getCategoriesbyID(datas) {
        const connection = this.getConnection();
        let query = `SELECT * FROM categories WHERE id=?`;
        let array = [];
        if (datas.length > 1) {
            datas.forEach(element => {
                array.push(element);
                if (datas.indexOf(element) != 0) {
                    query += ` OR id=?`;
                }
            });
        }
        else {
            array.push(datas[0]);
        }
        return new Promise((resolve, reject) => {
            connection.query(query, array, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    getProductsByCat(id) {
        let connection = this.getConnection();
        let query = `SELECT * FROM products WHERE categoryID=?`;
        let numb = id;
        return new Promise((resolve, reject) => {
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map