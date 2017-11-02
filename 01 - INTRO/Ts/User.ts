import { Model } from "./Model";

export class User extends Model implements JsonSerializable {
    
    jsonSerialize(): {} {
        throw new Error("Method not implemented.");
    }
    
    getModel(): string {
        throw new Error("Method not implemented.");
    }

    public name: string;
    private id: number;
    protected password: string;

    constructor(id: number, password: string, name?: string){

        super(); // Appel obligatoire du constructeur parent, même si il n'existe pas

        this.name = name || "Jean"
        this.id = id
        this.password = password
    }

    getId():number {
        return this.id
    }
}

var user: User = new User(3, "myPass")
console.log(user.name)
console.log(user.getId())
// console.log(user.name = "Raul", user.id = 2)