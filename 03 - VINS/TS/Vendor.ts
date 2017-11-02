import { Model } from "./Model";
import { Product } from "./Product";
import { Category } from "./Category";

export class Vendor extends Model {

    protected name:string
    protected product:Array<Product>
    protected $dom:JQuery

    constructor(id:number, name:string, product:Array<Product>){

        super(id)

        this.name = name
        this.product = product
    }

    getName(): string {
        return this.name
    }

    getProduct(): Array<Product> {
        return this.product
    }

    displayAllVendor(parent:JQuery): void {

        let div:string = `<li class="`+ this.name +`">`+ this.name +`</li>`;

        this.$dom = $(div);

        parent.append(this.$dom);
    }

    display(parent:JQuery, Products:Array<Product>): void {

        let div:string = `<div class="container vendor" id="`+ this.name +`">`

        for (let prodID of Products){

            let category: Category = prodID.getCategory();
            let categoryName: string = category.getName()

            div += `<div id="`+ categoryName + prodID.getId() + `" class="item `+ categoryName +`" data-productid="`+ prodID.getId() +`" draggable="true"></div>`
        } 

        div += `</div>` 
        

        this.$dom = $(div);

        parent.append(this.$dom);
    }
}