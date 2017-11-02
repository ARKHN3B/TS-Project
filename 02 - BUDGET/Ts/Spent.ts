export class Spent {

    private title: string;
    private value: number;
    private description: string;
    private category: string;

    public $dom: JQuery<HTMLElement>


	constructor(title: string, value: number, description: string, category: string) {

		this.title = title;
		this.value = value;
		this.description = description;
		this.category = category;
    }
    
    getValue(): number {
        return this.value
    }
    
    display($parent: JQuery<HTMLElement>): void{

        let div: string = `<div class="spent">
                           <h3>`+ this.title +`</h3>
                           <h4> `+ this.value +` </h4>
                           </div>`;
                        
        this.$dom = $(div)

        $parent.append(this.$dom)
    }
}