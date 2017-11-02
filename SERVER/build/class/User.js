"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(connection) {
        this.connection = connection;
    }
    getConnection() {
        return this.connection;
    }
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
    checkIfUserExist(req, res, callback) {
        const connection = this.getConnection();
        let query = "SELECT * FROM users WHERE username=? AND password=?";
        let array = [req.body.username, req.body.password];
        connection.query(query, array, (err, result, fields) => {
            callback(result);
        });
    }
    getVendorByID(req, res, callback) {
        const connection = this.getConnection();
        let query = `SELECT * FROM vendors WHERE userID=?`;
        let array = [req.params.id];
        connection.query(query, array, (err, result, fields) => {
            callback(result);
        });
    }
}
exports.Service = Service;
//# sourceMappingURL=User.js.map