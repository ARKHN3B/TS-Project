System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            // # 6.1) COnstruction d'une classe parente aux futurs classes : Produits/Catégories/Vendeurs
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                // Getter de 'id'
                getId() {
                    return this.id;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                getName() {
                    return this.name;
                }
                display(parent) {
                    let div = `<div class="container" id="` + this.name + `">
                            <h3>` + this.name + `</h3>
                          </div>`;
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = class Product extends Model_2.Model {
                constructor(id, name, category) {
                    super(id);
                    this.name = name;
                    this.category = category;
                }
                // Getter 'name'
                getName() {
                    return this.name;
                }
                //Getter 'category'
                getCategory() {
                    return this.category;
                }
                display(parent) {
                    let categoryName = this.category.getName();
                    let div = `<div id="` + categoryName + this.getId() + `" class="item ` + categoryName + `" data-productid="` + this.getId() + `"></div>`;
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
            };
            exports_3("Product", Product);
        }
    };
});
System.register("Vendor", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = class Vendor extends Model_3.Model {
                constructor(id, name, product) {
                    super(id);
                    this.name = name;
                    this.product = product;
                }
                getName() {
                    return this.name;
                }
                getProduct() {
                    return this.product;
                }
                displayAllVendor(parent) {
                    let div = `<li class="` + this.name + `">` + this.name + `</li>`;
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
                display(parent, Products) {
                    let div = `<div class="container vendor" id="` + this.name + `">`;
                    for (let prodID of Products) {
                        let category = prodID.getCategory();
                        let categoryName = category.getName();
                        div += `<div id="` + categoryName + prodID.getId() + `" class="item ` + categoryName + `" data-productid="` + prodID.getId() + `" draggable="true"></div>`;
                    }
                    div += `</div>`;
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
            };
            exports_4("Vendor", Vendor);
        }
    };
});
// export const Database:{} = {
System.register("FakeDatabase", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var FakeDatabase;
    return {
        setters: [],
        execute: function () {// export const Database:{} = {
            // }
            // # 4.1) Création d'un objet JSON qui représentera notre Database 
            exports_5("FakeDatabase", FakeDatabase = {
                // # 4.2)
                categories: [
                    {
                        id: 1,
                        name: "Rouge"
                    },
                    {
                        id: 2,
                        name: "Blanc"
                    },
                    {
                        id: 3,
                        name: "Muscat"
                    },
                ],
                // # 4.3)
                products: [
                    {
                        id: 1,
                        name: "Bordeaux",
                        categoryID: 1
                    },
                    {
                        id: 2,
                        name: "Rivesalte",
                        categoryID: 3
                    },
                    {
                        id: 3,
                        name: "Chardon",
                        categoryID: 2
                    },
                    {
                        id: 4,
                        name: "Petit-gris",
                        categoryID: 2
                    }
                ],
                // # 4.4)
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "Jeremy",
                        products: [2]
                    },
                    {
                        id: 3,
                        name: "Stephane",
                        products: [1]
                    }
                ]
            });
        }
    };
});
System.register("App", ["FakeDatabase", "Category", "Product", "Vendor"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var FakeDatabase_1, Category_1, Product_1, Vendor_1, App;
    return {
        setters: [
            function (FakeDatabase_1_1) {
                FakeDatabase_1 = FakeDatabase_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Product_1_1) {
                Product_1 = Product_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.arrayCategories = [];
                    this.arrayProducts = [];
                    this.arrayVendors = [];
                    this.basket = {};
                    this.currentSeller = null;
                    this.flagVendorDisplay = false;
                }
                init() {
                    this.getAllCategories();
                    this.getAllProducts();
                    this.getAllVendors();
                    this.naVendor();
                    this.displayVendorList();
                    // this.removeThatBitch();
                    console.log(this.basket);
                    return this;
                }
                // # 2) Function pour initialiser le drag'n'drop
                dragNdrop() {
                    let $ctr = $('.container');
                    // # 1) On set la propriété 'draggable' sur true des item (DOM elements) 
                    let $item = $('.item');
                    $item.prop('draggable', true);
                    const self = this;
                    // # 3.1) On empêche l'event déclenché lorsqu'un élément/sélection de texte est glissé dans un endroit valide 
                    $ctr.on('dragover', function (e) {
                        e.preventDefault();
                    });
                    // # 3.2)
                    $item.on('dragstart', function (e) {
                        const dragEvent = e.originalEvent;
                        dragEvent.dataTransfer.setData('id', $(this).attr('id'));
                    });
                    // # 3.3)
                    $ctr.on('drop', function (e) {
                        const dragEvent = e.originalEvent;
                        const id = dragEvent.dataTransfer.getData('id');
                        const $element = $('#' + id);
                        const containerID = $(this).attr('id');
                        let myID = $element.data('productid');
                        let product = self.getProductByID(myID);
                        let seller = self.currentSeller;
                        if ($(this).hasClass('vendor')) {
                            self.basket[seller].push(product);
                            $(this).append($element);
                            console.log(self.basket);
                        }
                        else if ($element.hasClass(containerID)) {
                            self.basket[seller].splice($.inArray(product, self.basket[seller]), 1);
                            $(this).append($element);
                            console.log(self.basket);
                        }
                    });
                }
                // # 7) Création des différentes classes Vendor/Category/Product
                // # 8) Récupération de tous les produits
                getAllProducts() {
                    let products = FakeDatabase_1.FakeDatabase.products;
                    for (let product of products) {
                        let theProduct = new Product_1.Product(product.id, product.name, this.getCategoryByID(product.categoryID) // # 8.2) Need la récupération de la catégorie par l'ID
                        );
                        let categoria = theProduct.getCategory();
                        let parent = $('#' + categoria.getName());
                        theProduct.display(parent);
                        this.arrayProducts.push(theProduct);
                    }
                }
                // # 9.1) Récupération du produit par l'ID
                getCategoryByID(id) {
                    // # 9.2) Nécessité de connaître toutes les catégories
                    for (let category of this.arrayCategories) {
                        if (id == category.getId())
                            return category;
                    }
                    return null;
                }
                // # 9.3) On rentre toutes les catégories connues ici :
                getAllCategories() {
                    let parent = $('#shop-list');
                    let categories = FakeDatabase_1.FakeDatabase.categories;
                    for (let category of categories) {
                        let theCategory = new Category_1.Category(category.id, category.name);
                        theCategory.display(parent);
                        this.arrayCategories.push(theCategory);
                    }
                    // # 9.4) On peut retourner à notre getProductByID()
                }
                // # 10) On souhaite connaître un produit par ID
                getProductByID(id) {
                    for (let product of this.arrayProducts) {
                        if (id == product.getId())
                            return product;
                    }
                    return null;
                }
                // # 11.1) On souhaite connaître les vendeurs
                getAllVendors() {
                    const parent1 = $('#ul-list');
                    let vendors = FakeDatabase_1.FakeDatabase.vendors;
                    for (let vendor of vendors) {
                        let productByVendor = [];
                        this.basket[vendor.id] = [];
                        for (let product of vendor.products) {
                            let theProduct = this.getProductByID(product);
                            productByVendor.push(theProduct);
                            this.basket[vendor.id].push(theProduct);
                        }
                        let theVendor = new Vendor_1.Vendor(vendor.id, vendor.name, productByVendor);
                        theVendor.displayAllVendor(parent1);
                        this.arrayVendors.push(theVendor);
                    }
                }
                // # 12) Display nav vendors
                naVendor() {
                    $('#sellersDisplay').on('click', () => {
                        if (this.flagVendorDisplay == false) {
                            $('#sellers-list').fadeIn(200);
                            this.flagVendorDisplay = true;
                        }
                        else {
                            $('#sellers-list').fadeOut(200);
                            this.flagVendorDisplay = false;
                        }
                    });
                }
                displayVendorList() {
                    const self = this;
                    const parent = $('#vendor-list');
                    this.currentSeller = 1;
                    const firstVendor = this.arrayVendors[0];
                    const numbVendor = firstVendor.getId();
                    const getBasketID = this.basket[numbVendor];
                    firstVendor.display(parent, getBasketID);
                    let childs = $('#ul-list').children();
                    this.removeThatBitch();
                    childs.on('click', function () {
                        let shits = $('#shop-list').children().remove();
                        self.getAllCategories();
                        self.getAllProducts();
                        let thatClass = $(this).attr('class');
                        $('.vendor').remove();
                        for (let vendor of self.arrayVendors) {
                            let vendorID = vendor.getId();
                            const basketID = self.basket[vendorID];
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
                removeThatBitch() {
                    let childs = $('#shop-list').children().children();
                    let bitchies = $('.vendor').children();
                    for (let child of childs) {
                        // console.log($(child).attr('id'))
                        let attr1 = $(child).attr('id');
                        for (let bitch of bitchies) {
                            let attr2 = $(bitch).attr('id');
                            if (attr1 == attr2) {
                                $(child).remove();
                            }
                        }
                    }
                }
            };
            exports_6("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App().init();
        }
    };
});
//# sourceMappingURL=main.js.map