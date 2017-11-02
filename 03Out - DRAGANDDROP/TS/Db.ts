export const DB:{ [key: string]: {}[] } = {

    categories : [

        {
            id : 1,
            name : "Rouge"
        },
        {
            id : 2,
            name : "Rose"
        },
        {
            id : 3,
            name : "Blanc"
        },
        {
            id : 4,
            name : "Muscat"
        }
    ],

    products : [

        {
            id : 1,
            name : "Bordeaux",
            categoryId : 1
        },
        {
            id : 2,
            name : "Rivesaltes",
            categoryId : 4
        }  
    ],

    vendors : [
        {
            id : 1,
            name : 'Paul',
            products : [ 1, 3 ]
        },
        {
            id : 2,
            name : 'Jeremy',
            products : [ 3 ]
        },
        {
            id : 3,
            name : 'Stephane',
            products : [ 2 ]
        }
    ]
}