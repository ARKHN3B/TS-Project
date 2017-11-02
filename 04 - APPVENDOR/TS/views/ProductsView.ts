import { App } from "../App";

export class ProductsView {

    constructor(){

    }

    getProducts(): Promise<any> {

        return new Promise((resolve: any, reject: any) => {

            $('.category').on('click', function(){
                
                let categoryID: number = $(this).data('category') as number;
    
                $.ajax({
                    url: `http://localhost:3088/winests//productVendor/${categoryID}`,
                    method: 'GET',
                    dataType: 'JSON',
                    success: (data: {}) => {
                        resolve(data);
                    },
                    error: (err: {}) => {
                        reject(err);
                    }
                });
            });
        });
    }

    display(data: Array<any>): void {

        let section: string = $('section').data('section');
        if (section == 'category') {
            $('section').data('section', 'category').remove();
        }

        let dom = `<section data-section="list">
                       <ul>`;   

        if (data.length > 1) {

            data.forEach((element: any) => {
                dom += `<li class="product" data-productID="`+ element.id +`"><span> 🍷 </span> ` + element.name + ` </li>`;
            });
        } else 
            dom += `<li class="product" data-productID="`+ data[0].id +`"><span> 🍷 </span> ` + data[0].name + ` </li>`;

        dom += `</ul>
            </section>`;

        let $dom = $(dom);

        $('body').append($dom);
        this.displayOne();
    }

    displayOne(): void {

        $('.product').on('click', function(){

            let id = $(this).data('productid');
            let section = $('section').data('section', 'list');
                section.remove();

            $.ajax({
                url: `http://localhost:3088/winests/product/${id}`,
                method: 'GET',
                dataType: 'JSON',
                success: (data: any) => {
                    console.log(data);
                    displayer(data[0].name);
                },
                error: (err: any) => {
                    console.log(err);
                }
            });

            function displayer(name: string){
                let dom = `<section data-section="product">
                               <div id="image"></div>
                               <h4>${name}</h4>
                           </section>`;
                let $dom = $(dom);

                $('body').append($dom);
            }
        });
    }
} 