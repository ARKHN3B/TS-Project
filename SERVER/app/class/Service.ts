import * as mySQL from 'mysql';
import * as BodyParser from 'body-parser';
import {Request, Response} from 'express'; 

export class Service {

    protected connection: mySQL.Connection;
    

    constructor(connection: mySQL.Connection){

        this.connection = connection;
    }


    getConnection(): mySQL.Connection {
        return this.connection;
    }


    // ☁ no use
    checkUsernamePassword(req: Request, res: Response, callback: any): void {

        const connection: mySQL.Connection = this.getConnection();
        
        let query: string = "SELECT * FROM users WHERE username=? AND password=?";
        let array: Array<Express.Request> = [req.params.username, req.params.password];

        // error = erreur
        // result = le résultat de la requête
        // fields = les champs de la db + infos
        connection.query(query, array, (error, result, fields) => {
            
            callback(result);

        });
    }


    // use
    checkIfUserExist(req: Request, res: Response, callback: any): void {

        const connection: mySQL.Connection = this.getConnection();

        let query: string = "SELECT * FROM users WHERE username=? AND password=?";
        let array: Array<Express.Request> = [req.body.username, req.body.password];

        connection.query(query, array, (err, result, fields) => {

            callback(result);
        });
    }


    // ☁ no use
    getVendorByUserID(req: Request, res: Response): Promise<any> {

        const connection: mySQL.Connection = this.getConnection();

        let query: string = `SELECT * FROM vendors WHERE userID=?`;
        let array: Array<Express.Request> = [req.params.userID];

        return new Promise( (resolve, reject) => { 
            connection.query(query, array, (err, result, fields) => {
                resolve(result);
            });
        });
    }


    // use
    getProductByID(id: number): Promise<any> {

        const connection: mySQL.Connection = this.getConnection();

        let query: string = `SELECT * FROM products WHERE id=?`;
        let numb: number = id;

        return new Promise( (resolve, reject) => { 
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }


    // use
    getProductbyUserID(id:number): Promise<any> {

        const connection: mySQL.Connection = this.getConnection();

        let query: string = `SELECT products.* FROM products
                            JOIN vendors ON vendors.userID=?
                            WHERE vendors.productID = products.id`;
        let numb: number = id;

        return new Promise((resolve: any, reject: any) => {
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }


    // use
    getCategoriesbyID(datas: Array<number>): Promise<any> {

        const connection: mySQL.Connection = this.getConnection();

        let query: string = `SELECT * FROM categories WHERE id=?`;
        let array: Array<number> = [];

        if (datas.length > 1) {

            datas.forEach(element => {

                array.push(element);

                if (datas.indexOf(element) != 0) {
                    query += ` OR id=?`
                }
            });
            
        } else {
            array.push(datas[0]);
        }

        return new Promise((resolve:any, reject: any) => {
            connection.query(query, array, (err, result, fields) => {

                resolve(result);
            });
        });
    }



    getProductsByCat(id: number): Promise<any> {

        let connection: mySQL.Connection = this.getConnection();

        let query: string = `SELECT * FROM products WHERE categoryID=?`;
        let numb: number = id;

        return new Promise((resolve: any, reject:any) => {
            connection.query(query, numb, (err, result, fields) => {
                resolve(result);
            });
        });
    }
}