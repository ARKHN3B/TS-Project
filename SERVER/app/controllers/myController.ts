// # 1) Importation de seulement ce que l'on a besoin de 'express'
import { Router, Request, Response } from 'express';
import { Service } from '../class/Service';
import { connection } from '../server';

// # 2) On assigne une variable 'router' à l'instance express.Router()
const router: Router = Router();


// # 3.1) Le '/' ici correspond à la route sur laquelle 'welcomeController' est monté. Dans ce cas, c'est '/welcome'
router.get('/', (req: Request, res: Response) => {

    // # 3.2) Renvoit un "Hello World" lorsqu'aucun paramètre n'est donné 
    res.send('Hello World !');
});


// ☁ no use
router.get('/name/:name', (req: Request, res: Response) => {

    // # 4.1) Ici, on récupère l'élément renvoyé dans l'URL
    let { name } = req.params;

    // # 4.2) On affiche le nom de cet élément
    res.send(`Hello, ${name}`);
});


// ☁ no use
router.get('/test/:username/:password', (req: Request, res: Response) => {

    let username: string = req.params.username;
    let password:string = req.params.password;

    let service: Service = new Service(connection);

    service.checkUsernamePassword(req, res, (data:any) => {

        // On utilise une callback pour afficher la réponse sur la page
        // res.json(data);

        if (!(data.length == 0))
            res.json(data)
        else
            res.send('not ok because data is empty')

    });
});


// use
router.post('/checkUserExist', (req: Request, res: Response) => {

    let service: Service = new Service(connection);

    service.checkIfUserExist(req, res, (data:any) => {

        if (!(data.length == 0))
            res.json(data)
        else
            res.send(false)
    });
});  


// ☁ no use
router.get('/getCategoriesByUserID/:userID', (req: Request, res: Response) => {

    let service: Service = new Service(connection);

    let promise = service.getVendorByUserID(req, res);
    promise.then((data: any) => {

        let datas: Array<number> = [];
        let products: Array<{}> = [];
        
        data.forEach((element: any) => {
        
            datas.push(element.productID);

        });

        new Promise( (resolve, reject) => {
            let i:number = 0;
            datas.forEach((element: number) => {

                let ppromise = service.getProductByID(element);
                ppromise.then( (data) => {
                    i++;
                    products.push( data );

                    if( i == datas.length ) resolve ( products );
                });

            });          
        }).then( (products) => {
            console.log( products );
        } )

    });
});


// use
router.get('/categoriesUser/:userID', (req: Request, res: Response) => {

    let service: Service = new Service(connection);

    let servicePromise = service.getProductbyUserID(req.params.userID);
        servicePromise.then((datas:any) => {

            let catID: Array<number> = [];

            datas.forEach((element: any) => {
                
                let categoryID:number = element.categoryID;

                // Si l'élément ne se trouve pas dans le tableau
                if (catID.indexOf(categoryID) == -1) {
                    catID.push(categoryID);
                }
            });

            let catPromise: Promise<void> = service.getCategoriesbyID(catID);
                catPromise.then((datas: any) => {

                    res.send(datas);
                });
        });
});

router.get('/productVendor/:userID', (req: Request, res: Response) => {

    let service: Service = new Service(connection);

    let servicePromise = service.getProductsByCat(req.params.userID);
        servicePromise.then((data: any) => {
            res.json(data);
        });
});

router.get('/product/:productID', (req: Request, res: Response) => {

    let service: Service = new Service(connection);

    let servicePromise : Promise<any> = service.getProductByID(req.params.productID);
        servicePromise.then((data) => {
            res.json(data);
        });
});

// # 5) On export l'instance d'express.Router() qui sera utilisée par 'server.ts'
export const myCONTROLLER: Router = router;


