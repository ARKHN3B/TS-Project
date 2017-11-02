System.register("Basket", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Basket;
    return {
        setters: [],
        execute: function () {
            Basket = class Basket {
                constructor() {
                    this.$menu = $('#menu');
                }
                // Getter $dom
                get get$dom() {
                    return this.$dom;
                }
                // Getter $title
                get get$title() {
                    return this.$title;
                }
                displayCurrentBasket(client) {
                    let div = `<h3 id="actualClient">` + client + `</h3>`;
                    this.$title = $(div);
                    this.$menu.after(this.$title);
                }
                display(client) {
                    this.displayCurrentBasket(client);
                    let div = `<section id="client-` + client + `">
                    
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
                            </section>`;
                    this.$dom = $(div);
                    this.$menu.after(this.$dom);
                    return this;
                }
            };
            exports_1("Basket", Basket);
        }
    };
});
System.register("App", ["Basket"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Basket_1, App;
    return {
        setters: [
            function (Basket_1_1) {
                Basket_1 = Basket_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.$button = $('.button');
                    this.$section = $('section');
                    this.currentBasket = null;
                    this.arrayCat = ['blue', 'red', 'End'];
                    this.clients = {};
                }
                dragandDrop(client) {
                    const self = this;
                    let $underContainer = $('.under-container');
                    let $item = $('.item');
                    $item.prop('draggable', true);
                    $underContainer.on('dragover', function (e) {
                        e.preventDefault();
                    });
                    $item.on('dragstart', function (e) {
                        let dragEvent = e.originalEvent;
                        dragEvent.dataTransfer.setData('id', $(this).data('type'));
                    });
                    $underContainer.on('drop', function (e) {
                        const dragEvent = e.originalEvent;
                        const id = dragEvent.dataTransfer.getData('id');
                        const $element = $(`[data-type="` + id + `"]`);
                        const containerId = $(this).attr('id');
                        if ($(this).hasClass('vendor')) {
                            if ($element.hasClass('inVendor')) {
                                return;
                            }
                            else {
                                $element.addClass('inVendor');
                                if ($element.hasClass('inVendor'))
                                    $element.removeClass('outVendor');
                                self.save(client, $element);
                                $(this).append($element);
                            }
                        }
                        else if ($element.hasClass(containerId)) {
                            if ($element.hasClass('outVendor'))
                                return;
                            else {
                                $element.addClass('outVendor');
                                if ($element.hasClass('inVendor'))
                                    $element.removeClass('inVendor');
                                self.delete(client, $element);
                                $(this).append($element);
                            }
                        }
                        self.read(client, $('.under-container'));
                    });
                }
                organizeDrag() {
                    var self = this;
                    for (let cat in this.arrayCat) {
                        let parser = (parseInt(cat) + 1);
                        $('#under-container' + parser).on('drop', function (e) {
                            let dragEvent = e.originalEvent;
                            let id = dragEvent.dataTransfer.getData('id');
                            let $element = $(`[data-type="` + id + `"]`);
                            if ($(this).hasClass(self.arrayCat[cat])
                                && $element.hasClass(self.arrayCat[cat]) || $(this).hasClass('End'))
                                $(this).append($element);
                        });
                    }
                }
                read(client, container) {
                    for (let element of this.clients[client]) {
                        let id = element;
                        let dataString = id.data().type;
                        let childs = $(container.children());
                        for (let child of childs) {
                            let getChild = $(child).data();
                            if (id.data() == getChild) {
                                console.log('test');
                                container.removeData(getChild.type);
                            }
                        }
                    }
                }
                delete(x, element) {
                    const currentArray = this.clients[x];
                    for (let elem of currentArray) {
                        if (elem.is(element)) {
                            currentArray.splice($.inArray(elem, currentArray), 1);
                        }
                    }
                    // console.log(currentArray.indexOf(element))
                    // currentArray.splice($.inArray(element, currentArray), 1)
                    // currentArray.splice(0, 1, element)
                }
                save(x, element) {
                    this.clients[x].push(element);
                }
                display(x) {
                    let client = x || 1;
                    let basket = new Basket_1.Basket().display(client);
                    this.currentBasket = basket; // On set le basket en cours
                    if (!this.clients[client])
                        this.clients[client] = [];
                    this.read(1, $('.under-container'));
                    this.dragandDrop(client);
                    console.log(this.clients);
                    return this;
                }
                currentClient() {
                    const self = this;
                    this.$button.on('click', function () {
                        let value = $(this).val();
                        self.currentBasket.get$title.remove();
                        self.currentBasket.get$dom.remove(); // On demande à remove le 'basket' en question 
                        // On set le nouveau basket :
                        self.display(value);
                    });
                    return this;
                }
            };
            exports_2("App", App);
        }
    };
});
System.register("Db", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var DB;
    return {
        setters: [],
        execute: function () {
            exports_3("DB", DB = {
                categories: [
                    {
                        id: 1,
                        name: "Rouge"
                    },
                    {
                        id: 2,
                        name: "Rose"
                    },
                    {
                        id: 3,
                        name: "Blanc"
                    },
                    {
                        id: 4,
                        name: "Muscat"
                    }
                ],
                products: [
                    {
                        id: 1,
                        name: "Bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "Rivesaltes",
                        categoryId: 4
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: 'Paul',
                        products: [1, 3]
                    },
                    {
                        id: 2,
                        name: 'Jeremy',
                        products: [3]
                    },
                    {
                        id: 3,
                        name: 'Stephane',
                        products: [2]
                    }
                ]
            });
        }
    };
});
System.register("main", ["App"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App().display()
                .currentClient();
        }
    };
});
System.register("Product", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Product;
    return {
        setters: [],
        execute: function () {
            Product = class Product {
            };
            exports_5("Product", Product);
        }
    };
});
//# sourceMappingURL=main.js.map