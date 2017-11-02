import { Model } from "./Model";

export class Category extends Model {

    protected name: string;
    protected $dom: JQuery

    constructor(id: number, name: string){

        super(id)

        this.name = name
    }

    getName(): string {
        return this.name
    }

    display(parent: JQuery): void {

        let div:string = `<div class="container" id="`+ this.name +`">
                            <h3>`+ this.name +`</h3>
                          </div>`;

        this.$dom = $(div);

        parent.append(this.$dom)
    }
}