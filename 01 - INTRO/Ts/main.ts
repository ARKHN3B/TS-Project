import { User } from "./User";

/* Variables : */

// # 1) 'CONST' :   constante
const a = 3
// const a = 4   -->   Impossible à changer la valeur

// # 2) 'LET' :   garde la variable dans un contexte donné

// # 3) 'VAR' :   as usual


/* ====================================================================================================================================== */


/* # 4) Typage des variables : 

   String    -    Number    -    Boolean    -    Function
*/


var myNumber: number = 4
// myNumber = "qweqe"   -->   la variable myNumber doit contenir un nombre


var myString: string = "test"
// myNumber = 732   -->   la variable myString doit contenir un string


// Typage de function
var callback: Function = function(){
    console.log("test function")
}
callback()


// Typage d'éléments du DOM html
var dom: HTMLElement = document.getElementById('domelement');


/* ====================================================================================================================================== */


/* # 5) Typage des fonctions : 

    RETOURS : String    -    Number    -    Boolean    -    VOID   -    ANY
*/
function addition(n1: number, n2: number):number {
    return n1 + n2;
}

console.log(addition(1, 3))


/* ====================================================================================================================================== */


/* # 6) Arrays et Objets (simple) */

var tab: number[] = [1, 2, 2, 3]
var tab2: (number|string)[] = [1, 2, "edwdewq", 344];

var tab3: {} = {
    test : "ok"
}

var tab4: {status?: boolean, value: string[]} = { // LE '?' RENVOIT UN PARAMÈTRE OPTIONNEL
    status : true,
    value : []
}

var stringToNumber:number = parseInt("234")


/* ====================================================================================================================================== */


var user: User = new User(2, "myPass", "Test")
console.log(user.name)