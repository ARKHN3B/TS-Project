// export const Database:{} = {

// }

// # 4.1) Création d'un objet JSON qui représentera notre Database 
export const FakeDatabase:{
    // # 5.1) On force le type dans la déclaration du typage de l'objet
    categories: Array<{id:number, name:string}> // # 5.2) Tableau d'objets JSON
    products: Array<{id:number, name:string, categoryID:number}> // # 5.3)
    vendors: Array<{id:number, name:string, products:Array<number>}> // # 5.4)
 
} = {

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
    products : [
        {
            id : 1,
            name : "Bordeaux",
            categoryID : 1
        },
        {
            id : 2,
            name : "Rivesalte",
            categoryID : 3
        },
        {
            id : 3,
            name : "Chardon",
            categoryID : 2
        },
        {
            id : 4,
            name : "Petit-gris",
            categoryID : 2
        }
    ],

    // # 4.4)
    vendors : [
        {
            id: 1,
            name: "Paul",
            products : [ 1, 2 ]
        },
        {
            id: 2,
            name: "Jeremy",
            products : [ 2 ]
        },
        {
            id: 3,
            name: "Stephane",
            products : [ 1 ]
        }

    ]
}