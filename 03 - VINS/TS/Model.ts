// # 6.1) COnstruction d'une classe parente aux futurs classes : Produits/Catégories/Vendeurs
export abstract class Model {

    protected id:number;

    constructor(id:number){
        this.id = id;
    }

    // Getter de 'id'
    getId(): number {
        return this.id
    }

    // # 6.2) On force ici - avec 'abstract' - à ce que les classes enfante utilisent : 
    protected abstract $dom:JQuery
    abstract display(parent:JQuery, option?: any): void
}   