System.register("Spent", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Spent;
    return {
        setters: [],
        execute: function () {
            Spent = class Spent {
                constructor(title, value, description, category) {
                    this.title = title;
                    this.value = value;
                    this.description = description;
                    this.category = category;
                }
                getValue() {
                    return this.value;
                }
                display($parent) {
                    let div = `<div class="spent">
                           <h3>` + this.title + `</h3>
                           <h4> ` + this.value + ` </h4>
                           </div>`;
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_1("Spent", Spent);
        }
    };
});
System.register("Category", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Category;
    return {
        setters: [],
        execute: function () {
            (function (Category) {
                Category["Nourriture"] = "Nourriture";
                Category["Sorties"] = "Sorties";
                Category["Courses"] = "Courses";
                Category["Sport"] = "Sport";
                Category["Loisir"] = "Loisir";
            })(Category || (Category = {}));
            exports_2("Category", Category);
        }
    };
});
System.register("App", ["Spent", "Category"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Spent_1, Category_1, App;
    return {
        setters: [
            function (Spent_1_1) {
                Spent_1 = Spent_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor(budget) {
                    this.budget = budget;
                    this.spents = [];
                    this.$budget = $('#dep');
                    this.$spent = $('#spent');
                    this.$buttonForm = $('#butt-form');
                    this.$form = $('form');
                    this.$title = $('#title');
                    this.$value = $('#value');
                    this.$description = $('#description');
                    this.$category = $('#cat');
                    this.init();
                }
                init() {
                    this.$budget.append("" + this.budget);
                }
                displayForm() {
                    this.$buttonForm.click(() => {
                        console.log('echo');
                    });
                    return this;
                }
                submitForm() {
                    this.$form.submit(e => {
                        e.preventDefault();
                        this.createSpent();
                        this.clearForm();
                    });
                    return this;
                }
                createSpent() {
                    let spent = new Spent_1.Spent(this.$title.val(), // 'as' force le type
                    this.$value.val(), this.$description.val(), this.$category.val());
                    this.spents.push(spent);
                    this.calcul(spent);
                    spent.display(this.$spent);
                }
                initSelect() {
                    // 'in' car il gère par les clés dans l'enum Category
                    for (let cat in Category_1.Category) {
                        const div = `<option value='` + cat + `'>` + cat + `</option>`;
                        const option = $(div);
                        this.$category.append(option);
                    }
                    return this;
                }
                clearForm() {
                    this.$title.val("");
                    this.$value.val("");
                    this.$description.val("");
                }
                calcul(spent) {
                    this.budget -= spent.getValue();
                    this.$budget.html("" + this.budget);
                }
            };
            exports_3("App", App);
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
            app = new App_1.App(350).displayForm()
                .submitForm()
                .initSelect();
        }
    };
});
//# sourceMappingURL=main.js.map