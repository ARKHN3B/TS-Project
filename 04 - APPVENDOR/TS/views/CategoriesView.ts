export class CategoriesView {

    constructor(){
        
    }

    display(data: Array<{}>): CategoriesView {

        let dom = `<section data-section="category">`

        data.forEach((element: any) => {
            
            dom += `<div class="category" data-category="` + element.id +`">
                        <h3>`+ element.name +`</h3>
                    </div>`;
        });

        dom += `</section>`;

        let $dom = $(dom);

        $('body').append($dom);
                
        return this;
    }

    getCategories(id: number): Promise<any> {

        return new Promise((resolve: any, reject: any) => {

            $.ajax({
                url: `http://localhost:3088/winests/categoriesUser/` + id,
                method: 'GET',
                dataType: 'JSON',
                success: data => {
                    resolve(data)
                },
                error: err => {
                    reject(err)
                }
            });
        });
    }

    
}