export class Basket {

    public $menu: JQuery
    protected $dom: JQuery;
    public $title: JQuery

    constructor(){
        this.$menu = $('#menu')
    }

    // Getter $dom
	public get get$dom(): JQuery {
		return this.$dom;
    }

    // Getter $title
	public get get$title(): JQuery {
		return this.$title;
    }
    
    displayCurrentBasket(client:number){

        let div = `<h3 id="actualClient">`+ client +`</h3>`

        this.$title = $(div)
        this.$menu.after(this.$title)
    }

    display(client:number): Basket {

        this.displayCurrentBasket(client)
         
        let div: string =   `<section id="client-`+ client +`">
                    
                                    <h2 style="top: 15%;
                                    left: 25%;">Products</h2>
                                    <div class="container" id="container-1">
                        
                                        <div class="under-container blue" id="blue">
                                            <div class="item blue outVendor" data-type="item1"></div>
                                            <div class="item blue outVendor" data-type="item2"></div>
                                            <div class="item blue outVendor" data-type="item3"></div>
                                            <div class="item blue outVendor" data-type="item4"></div>
                                            <div class="item blue outVendor" data-type="item5"></div>
                                            <div class="item blue outVendor" data-type="item6"></div>
                                        </div>
                                        
                                        <div class="under-container red" id="red">
                                                <div class="item red outVendor" data-type="item7"></div>
                                                <div class="item red outVendor" data-type="item8"></div>
                                                <div class="item red outVendor" data-type="item9"></div>
                                                <div class="item red outVendor" data-type="item10"></div>
                                                <div class="item red outVendor" data-type="item11"></div>
                                                <div class="item red outVendor" data-type="item12"></div>
                                        </div>
                                    </div>
                        
                                    <h2 style="top: 15%;
                                                left: 64.4%;">Sellers</h2>
                                    <div class="container" id="container-2">
                        
                                        <div class="under-container End vendor" id="vendor"></div>
                                    </div>
                            </section>`
        
        this.$dom = $(div)
        
        this.$menu.after(this.$dom)

        return this
    }
}