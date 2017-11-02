import { ConnectionView } from "./views/ConnectionView";
import { CategoriesView } from "./views/CategoriesView";
import { ProductsView } from "./views/ProductsView";

export class App {
    
    protected vendorID: number

    constructor(){
        this.vendorID;
    }

    getVendorID(): number {
        return this.vendorID;
    }

    setVendorID(id: number): void {
        this.vendorID = id;
    }

    init(vendor? : number): App {

        console.log(vendor);

        this.setVendorID(vendor);

        if (vendor) {
            this.displayCategories(vendor)
        } else {
            this.checkIfUserExist();
        }

        return this;
    }

    checkIfUserExist(): void {

        const connectionView: ConnectionView = new ConnectionView()
                                                        .display();
        let subPromise: Promise<any> = connectionView.whoSubmit();
            subPromise.then((data: any) => {


                if (data)
                    this.displayCategories(data[0].id);
                else 
                    console.log('wrong username/password')

            });
    }

    displayCategories(id:number): void {

        if (this.vendorID == null) {
            this.vendorID = id;
            this.localhost(id);
        }

        $('form').remove();
        const categoriesView: CategoriesView = new CategoriesView();
              let catPromise: Promise<any> = categoriesView.getCategories(id);
                  catPromise.then((data: any) => {

                        categoriesView.display(data);
                        this.displayProducts(id);
                  });
    }

    displayProducts(id:number): void {

        // this.backCategories(id);

        const productView: ProductsView = new ProductsView();
        let prodPromise: Promise<any> = productView.getProducts();
            prodPromise.then((data: any) => {
                productView.display(data);
            });
    }

    localhost(id: number): any {
        let stringify = JSON.stringify(id);
        localStorage.setItem('vendorID', stringify);
    }
}