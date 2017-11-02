System.register("views/ConnectionView", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConnectionView;
    return {
        setters: [],
        execute: function () {
            ConnectionView = class ConnectionView {
                constructor() {
                    this.$form = null;
                }
                display() {
                    let dom = `<form>
                        <input type="text" name="username" id="username" placeholder="username">
                        <input type="password" name="password" id="password" placeholder="password">
                        <input type="submit" name="" id="submit">
                   </form>`;
                    let $dom = $(dom);
                    $('body').append($dom);
                    return this;
                }
                whoSubmit() {
                    this.$form = $('form');
                    return new Promise((resolve, reject) => {
                        this.$form.on('submit', (e) => {
                            e.preventDefault();
                            let $username = $('#username').val();
                            let $password = $('#password').val();
                            $.ajax({
                                url: `http://localhost:3088/winests/checkUserExist`,
                                method: `POST`,
                                dataType: `JSON`,
                                data: {
                                    'username': $username,
                                    'password': $password
                                },
                                success: (data) => {
                                    resolve(data);
                                },
                                error: error => {
                                    reject(error);
                                }
                            });
                        });
                    });
                }
            };
            exports_1("ConnectionView", ConnectionView);
        }
    };
});
System.register("views/CategoriesView", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var CategoriesView;
    return {
        setters: [],
        execute: function () {
            CategoriesView = class CategoriesView {
                constructor() {
                }
                display(data) {
                    let dom = `<section data-section="category">`;
                    data.forEach((element) => {
                        dom += `<div class="category" data-category="` + element.id + `">
                        <h3>` + element.name + `</h3>
                    </div>`;
                    });
                    dom += `</section>`;
                    let $dom = $(dom);
                    $('body').append($dom);
                    return this;
                }
                getCategories(id) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: `http://localhost:3088/winests/categoriesUser/` + id,
                            method: 'GET',
                            dataType: 'JSON',
                            success: data => {
                                resolve(data);
                            },
                            error: err => {
                                reject(err);
                            }
                        });
                    });
                }
            };
            exports_2("CategoriesView", CategoriesView);
        }
    };
});
System.register("views/ProductsView", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var ProductsView;
    return {
        setters: [],
        execute: function () {
            ProductsView = class ProductsView {
                constructor() {
                }
                getProducts() {
                    return new Promise((resolve, reject) => {
                        $('.category').on('click', function () {
                            let categoryID = $(this).data('category');
                            $.ajax({
                                url: `http://localhost:3088/winests//productVendor/${categoryID}`,
                                method: 'GET',
                                dataType: 'JSON',
                                success: (data) => {
                                    resolve(data);
                                },
                                error: (err) => {
                                    reject(err);
                                }
                            });
                        });
                    });
                }
                display(data) {
                    let section = $('section').data('section');
                    if (section == 'category') {
                        $('section').data('section', 'category').remove();
                    }
                    let dom = `<section data-section="list">
                       <ul>`;
                    if (data.length > 1) {
                        data.forEach((element) => {
                            dom += `<li class="product" data-productID="` + element.id + `"><span> 🍷 </span> ` + element.name + ` </li>`;
                        });
                    }
                    else
                        dom += `<li class="product" data-productID="` + data[0].id + `"><span> 🍷 </span> ` + data[0].name + ` </li>`;
                    dom += `</ul>
            </section>`;
                    let $dom = $(dom);
                    $('body').append($dom);
                    this.displayOne();
                }
                displayOne() {
                    $('.product').on('click', function () {
                        let id = $(this).data('productid');
                        let section = $('section').data('section', 'list');
                        section.remove();
                        $.ajax({
                            url: `http://localhost:3088/winests/product/${id}`,
                            method: 'GET',
                            dataType: 'JSON',
                            success: (data) => {
                                console.log(data);
                                displayer(data[0].name);
                            },
                            error: (err) => {
                                console.log(err);
                            }
                        });
                        function displayer(name) {
                            let dom = `<section data-section="product">
                               <div id="image"></div>
                               <h4>${name}</h4>
                           </section>`;
                            let $dom = $(dom);
                            $('body').append($dom);
                        }
                    });
                }
            };
            exports_3("ProductsView", ProductsView);
        }
    };
});
System.register("App", ["views/ConnectionView", "views/CategoriesView", "views/ProductsView"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var ConnectionView_1, CategoriesView_1, ProductsView_1, App;
    return {
        setters: [
            function (ConnectionView_1_1) {
                ConnectionView_1 = ConnectionView_1_1;
            },
            function (CategoriesView_1_1) {
                CategoriesView_1 = CategoriesView_1_1;
            },
            function (ProductsView_1_1) {
                ProductsView_1 = ProductsView_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.vendorID;
                }
                getVendorID() {
                    return this.vendorID;
                }
                setVendorID(id) {
                    this.vendorID = id;
                }
                init(vendor) {
                    console.log(vendor);
                    this.setVendorID(vendor);
                    if (vendor) {
                        this.displayCategories(vendor);
                    }
                    else {
                        this.checkIfUserExist();
                    }
                    return this;
                }
                checkIfUserExist() {
                    const connectionView = new ConnectionView_1.ConnectionView()
                        .display();
                    let subPromise = connectionView.whoSubmit();
                    subPromise.then((data) => {
                        if (data)
                            this.displayCategories(data[0].id);
                        else
                            console.log('wrong username/password');
                    });
                }
                displayCategories(id) {
                    if (this.vendorID == null) {
                        this.vendorID = id;
                        this.localhost(id);
                    }
                    $('form').remove();
                    const categoriesView = new CategoriesView_1.CategoriesView();
                    let catPromise = categoriesView.getCategories(id);
                    catPromise.then((data) => {
                        categoriesView.display(data);
                        this.displayProducts(id);
                    });
                }
                displayProducts(id) {
                    // this.backCategories(id);
                    const productView = new ProductsView_1.ProductsView();
                    let prodPromise = productView.getProducts();
                    prodPromise.then((data) => {
                        productView.display(data);
                    });
                }
                localhost(id) {
                    let stringify = JSON.stringify(id);
                    localStorage.setItem('vendorID', stringify);
                }
            };
            exports_4("App", App);
        }
    };
});
System.register("Dom", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    /* Pour vérifier la concordance d'un élément du DOM (si il existe)
     */
    function Dom(element) {
        // On récupère l'élément HTML
        let elementJquery = $(element);
        // On vérifie qu'il existe bien dans le document
        if (elementJquery.length < 1)
            throw new Error(`L'élément ${element} n'existe pas dans votre html !`); // Renvoit une erreur au système
        // Si tout est ok, on return notre élément
        return elementJquery;
    }
    exports_5("Dom", Dom);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("main", ["App"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App().init();
            $('#back').click(() => {
                var read = localStorage.getItem('vendorID');
                var id = JSON.parse(read);
                $('form').remove();
                $('section').data('section', 'product').remove();
                $('section').data('section', 'list').remove();
                $('section').data('section', 'category').remove();
                var app = new App_1.App().init(id);
            });
            window.onbeforeunload = function () {
                localStorage.removeItem('vendorID');
            };
        }
    };
});
//# sourceMappingURL=main.js.map