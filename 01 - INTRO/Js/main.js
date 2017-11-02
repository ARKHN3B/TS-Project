System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
            };
            exports_1("Model", Model);
        }
    };
});
System.register("User", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, User, user;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            User = class User extends Model_1.Model {
                jsonSerialize() {
                    throw new Error("Method not implemented.");
                }
                getModel() {
                    throw new Error("Method not implemented.");
                }
                constructor(id, password, name) {
                    super(); // Appel obligatoire du constructeur parent, même si il n'existe pas
                    this.name = name || "Jean";
                    this.id = id;
                    this.password = password;
                }
                getId() {
                    return this.id;
                }
            };
            exports_2("User", User);
            user = new User(3, "myPass");
            console.log(user.name);
            console.log(user.getId());
            // console.log(user.name = "Raul", user.id = 2) 
        }
    };
});
System.register("main", ["User"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    /* ====================================================================================================================================== */
    /* # 5) Typage des fonctions :
    
        RETOURS : String    -    Number    -    Boolean    -    VOID   -    ANY
    */
    function addition(n1, n2) {
        return n1 + n2;
    }
    var User_1, a, myNumber, myString, callback, dom, tab, tab2, tab3, tab4, stringToNumber, user;
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            }
        ],
        execute: function () {
            /* Variables : */
            // # 1) 'CONST' :   constante
            a = 3;
            // const a = 4   -->   Impossible à changer la valeur
            // # 2) 'LET' :   garde la variable dans un contexte donné
            // # 3) 'VAR' :   as usual
            /* ====================================================================================================================================== */
            /* # 4) Typage des variables :
            
               String    -    Number    -    Boolean    -    Function
            */
            myNumber = 4;
            // myNumber = "qweqe"   -->   la variable myNumber doit contenir un nombre
            myString = "test";
            // myNumber = 732   -->   la variable myString doit contenir un string
            // Typage de function
            callback = function () {
                console.log("test function");
            };
            callback();
            // Typage d'éléments du DOM html
            dom = document.getElementById('domelement');
            console.log(addition(1, 3));
            /* ====================================================================================================================================== */
            /* # 6) Arrays et Objets (simple) */
            tab = [1, 2, 2, 3];
            tab2 = [1, 2, "edwdewq", 344];
            tab3 = {
                test: "ok"
            };
            tab4 = {
                status: true,
                value: []
            };
            stringToNumber = parseInt("234");
            /* ====================================================================================================================================== */
            user = new User_1.User(2, "myPass", "Test");
            console.log(user.name);
        }
    };
});
//# sourceMappingURL=main.js.map