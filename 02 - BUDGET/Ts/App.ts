import {Spent} from './Spent';
import { Category } from './Category';
export class App {

    private budget:number
    private spents: Spent[]

    public $budget: JQuery<HTMLElement>
    public $spent: JQuery<HTMLElement>
    public $buttonForm: JQuery<HTMLElement>
    public $form: JQuery<HTMLElement>
    public $title: JQuery<HTMLElement>
    public $value: JQuery<HTMLElement>
    public $description: JQuery<HTMLElement>
    public $category: JQuery<HTMLElement>


    constructor(budget: number){

        this.budget = budget
        this.spents = []

        this.$budget = $('#dep')
        this.$spent = $('#spent')
        this.$buttonForm = $('#butt-form')
        this.$form = $('form')
        this.$title = $('#title')
        this.$value = $('#value')
        this.$description = $('#description')
        this.$category = $('#cat')

        this.init();
    } 
    
    init(): void {
        this.$budget.append("" + this.budget);
    }

    displayForm(): App {

        this.$buttonForm.click(() => {

            console.log('echo')
        });

        return this;
    }

    submitForm(): App {

        this.$form.submit(e => {

            e.preventDefault();

            this.createSpent();
            this.clearForm();
        });

        return this;
    }

    createSpent(): void {

        let spent: Spent = new Spent(

            this.$title.val() as string, // 'as' force le type
            this.$value.val() as number,
            this.$description.val() as string,
            this.$category.val() as string
        )

        this.spents.push(spent)

        this.calcul(spent)
        spent.display(this.$spent)
    }

    initSelect(): App {

        // 'in' car il gère par les clés dans l'enum Category
        for (let cat in Category){
            
            const div: string = `<option value='`+ cat +`'>`+ cat +`</option>`
            const option: JQuery = $(div)
            this.$category.append(option)
        }

        return this;
    }

    clearForm(): void {

        this.$title.val("")
        this.$value.val("")
        this.$description.val("")
    }

    calcul(spent: Spent): void {
        this.budget -= spent.getValue();
        this.$budget.html("" + this.budget)
    }
}