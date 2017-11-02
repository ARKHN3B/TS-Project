import { Model } from "./Model";
import { Category } from "./Category";

export class Product extends Model {

    protected name: string
    protected category: Category
    protected $dom: JQuery

    constructor(id: number, name: string, category: Category){
        
        super(id)

        this.name = name
        this.category = category
    }

    // Getter 'name'
    getName(): string {
        return this.name
    }

    //Getter 'category'
    getCategory(): Category {
        return this.category;
    }

    display(parent: JQuery): void {

        let categoryName:string = this.category.getName();

        let div:string = `<div id="`+ categoryName + this.getId() + `" class="item `+ categoryName +`" data-productid="`+ this.getId() +`"></div>`;

        this.$dom = $(div);

        parent.append(this.$dom);
    }
}