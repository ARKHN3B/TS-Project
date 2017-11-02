import { FakeDatabase } from "./FakeDatabase";
import {Category} from './Category';
import { Product } from "./Product";
import { Vendor } from "./Vendor";

export class App {

    public arrayCategories:Array<Category>
    public arrayProducts:Array<Product>
    public arrayVendors:Array<Vendor>

    public basket: { [key:string]: Array<Product> }
    public currentSeller: number 

    public flagVendorDisplay:boolean

    constructor(){

        this.arrayCategories = []
        this.arrayProducts = []
        this.arrayVendors = []

        this.basket = {}
        this.currentSeller = null;

        this.flagVendorDisplay = false;
    }


    init(): App {

        this.getAllCategories();
        this.getAllProducts();
        this.getAllVendors();
        this.naVendor();
        this.displayVendorList();
        // this.removeThatBitch();

        console.log(this.basket)

        return this;
    }


    // # 2) Function pour initialiser le drag'n'drop
    dragNdrop(): void {

        let $ctr:JQuery = $('.container');
         // # 1) On set la propriété 'draggable' sur true des item (DOM elements) 
        let $item:JQuery = $('.item');
        $item.prop('draggable', true);

        const self = this;

        // # 3.1) On empêche l'event déclenché lorsqu'un élément/sélection de texte est glissé dans un endroit valide 
        $ctr.on('dragover', function(e){

            e.preventDefault()
        })

        // # 3.2)
        $item.on('dragstart', function(e){

            const dragEvent: DragEvent = e.originalEvent as DragEvent
            dragEvent.dataTransfer.setData('id', $(this).attr('id'))
        })

        // # 3.3)
        $ctr.on('drop', function(e){

            const dragEvent: DragEvent = e.originalEvent as DragEvent
            const id: string = dragEvent.dataTransfer.getData('id')
            const $element: JQuery = $('#' + id)
            const containerID: string = $(this).attr('id')

            let myID: number = $element.data('productid'); 
            let product: Product = self.getProductByID(myID);
            let seller:number = self.currentSeller;

            if ($(this).hasClass('vendor')) {

                self.basket[seller].push(product);

                $(this).append($element)

                console.log(self.basket)
            }    
            else if ($element.hasClass(containerID)) {

                self.basket[seller].splice($.inArray(product, self.basket[seller]), 1)

                $(this).append($element)

                console.log(self.basket)
            }   
        });
    }   


    // # 7) Création des différentes classes Vendor/Category/Product


    // # 8) Récupération de tous les produits
    getAllProducts(): void {

        let products: {

            id:number,
            name:string,
            categoryID:number
        }[] = FakeDatabase.products

        for (let product of products){

            let theProduct: Product = new Product(
                product.id,
                product.name,
                this.getCategoryByID(product.categoryID) // # 8.2) Need la récupération de la catégorie par l'ID
            )

            let categoria: Category = theProduct.getCategory();

            let parent: JQuery = $('#' + categoria.getName()); 

            theProduct.display(parent)
            

            this.arrayProducts.push(theProduct)
        }
    }
   
    
    // # 9.1) Récupération du produit par l'ID
    getCategoryByID(id:number): Category {
        
        // # 9.2) Nécessité de connaître toutes les catégories
        for (let category of this.arrayCategories){

            if (id == category.getId()) 
                return category
        }

        return null
    }


    // # 9.3) On rentre toutes les catégories connues ici :
    getAllCategories(): void {

        let parent: JQuery = $('#shop-list');

        let categories: {

            id:number,
            name:string
        }[] = FakeDatabase.categories

        for (let category of categories){

            let theCategory: Category = new Category(
                category.id,
                category.name
            )

            theCategory.display(parent);

            this.arrayCategories.push(theCategory)
        }

        // # 9.4) On peut retourner à notre getProductByID()
    }


    // # 10) On souhaite connaître un produit par ID
    getProductByID(id:number): Product {

        for (let product of this.arrayProducts){

            if (id == product.getId()) 
                return product
            
        }

        return null
    }


    // # 11.1) On souhaite connaître les vendeurs
    getAllVendors(): void {

        const parent1:JQuery = $('#ul-list');

        let vendors:{

            id:number,
            name:string,
            products:Array<number> // # 11.2) Ici, la nécessité va être d'aller convertir nos id en objet Product
        }[] = FakeDatabase.vendors

        for (let vendor of vendors){

            let productByVendor:Array<Product> = []

            this.basket[vendor.id] = []

            for (let product of vendor.products){

                let theProduct = this.getProductByID(product)

                productByVendor.push(theProduct)

                this.basket[vendor.id].push(theProduct);
            }

            let theVendor: Vendor = new Vendor(

                vendor.id,
                vendor.name,
                productByVendor
            )

            theVendor.displayAllVendor(parent1);

            this.arrayVendors.push(theVendor)
        }
    }


    // # 12) Display nav vendors
    naVendor(): void {

        $('#sellersDisplay').on('click', () => {

            if (this.flagVendorDisplay == false) {
                
                $('#sellers-list').fadeIn(200);
                this.flagVendorDisplay = true;

            } else {

                $('#sellers-list').fadeOut(200);
                this.flagVendorDisplay = false;
            }
        });
    }


    displayVendorList(): void {

        const self = this;

        const parent:JQuery = $('#vendor-list');

        this.currentSeller = 1;

        const firstVendor: Vendor = this.arrayVendors[0];
        const numbVendor: number = firstVendor.getId();
        const getBasketID: Array<Product> = this.basket[numbVendor];

        firstVendor.display(parent, getBasketID);

        let childs:JQuery = $('#ul-list').children();

        this.removeThatBitch();
        
        childs.on('click', function(){

            let shits = $('#shop-list').children().remove();

            self.getAllCategories();
            self.getAllProducts();
            
            let thatClass:string = $(this).attr('class');

            $('.vendor').remove();

            for (let vendor of self.arrayVendors){

                let vendorID:number = vendor.getId();
                const basketID: Array<Product> = self.basket[vendorID];

                if (vendor.getName() == thatClass) {

                    self.currentSeller = vendor.getId();
                    
                    vendor.display(parent, basketID);
                }
            }

            self.removeThatBitch();

            self.dragNdrop();
        });

        this.dragNdrop();
    }
    

    removeThatBitch(): void {

        let childs:JQuery = $('#shop-list').children().children();
        let bitchies:JQuery = $('.vendor').children();
        
        for (let child of childs){
            // console.log($(child).attr('id'))
            let attr1:string = $(child).attr('id');

            for (let bitch of bitchies){

                let attr2:string = $(bitch).attr('id');

                if (attr1 == attr2) {
                    
                    $(child).remove();
                }
            }
        }
    }
}