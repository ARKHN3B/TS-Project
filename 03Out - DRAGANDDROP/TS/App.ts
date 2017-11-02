import { Basket } from "./Basket";

export class App {

    public $button: JQuery
    public $section: JQuery

    // elem: { [key: string]: number | string }

    public currentBasket: Basket

    public arrayCat: string[]
    // protected clients: Array<JQuery[]> // tableau contenant des tableaux d'éléments JQuery
    public clients: { [key: number]: JQuery[] }


    constructor(){
        this.$button = $('.button')
        this.$section = $('section')
        
        this.currentBasket = null

        this.arrayCat = ['blue', 'red', 'End']
        this.clients = {}
    }


    dragandDrop(client: number): void { 

        const self = this

        let $underContainer = $('.under-container')
        let $item = $('.item')

        $item.prop('draggable', true);

        $underContainer.on('dragover', function(e){
            e.preventDefault()
        })
        
        $item.on('dragstart', function(e){ 
        
            let dragEvent: DragEvent = e.originalEvent as DragEvent
            dragEvent.dataTransfer.setData('id', $(this).data('type'))
        })

        $underContainer.on('drop', function(e){

            const dragEvent: DragEvent = e.originalEvent as DragEvent
            const id: string = dragEvent.dataTransfer.getData('id')
            const $element: JQuery = $(`[data-type="`+ id +`"]`)
            const containerId: string = $(this).attr('id')

            if ($(this).hasClass('vendor')){

                if ($element.hasClass('inVendor')){
                    return
                }
                else {
                    $element.addClass('inVendor')
                    
                    if ($element.hasClass('inVendor')) 
                        $element.removeClass('outVendor')


                    self.save(client, $element)
                    $(this).append($element)
                }

                
            }
            else if ($element.hasClass(containerId)){

                if ($element.hasClass('outVendor'))
                    return
                else {

                    $element.addClass('outVendor')

                    if ($element.hasClass('inVendor')) 
                        $element.removeClass('inVendor')


                    self.delete(client, $element)

                    $(this).append($element)
                }
            }  
            self.read(client, $('.under-container'))
        })   
    }

    organizeDrag(): void {
       
        var self = this

        for (let cat in this.arrayCat) {

            let parser = (parseInt(cat) + 1)
            
            $('#under-container' + parser).on('drop', function(e){   
                
                let dragEvent: DragEvent = e.originalEvent as DragEvent
                let id:string = dragEvent.dataTransfer.getData('id')
            
                let $element: JQuery = $(`[data-type="`+ id +`"]`)
            
                if ($(this).hasClass(self.arrayCat[cat]) 
                    && $element.hasClass(self.arrayCat[cat]) || $(this).hasClass('End'))     

                    $(this).append($element)
            })
        }
    }

    read(client: number, container: JQuery){

        for (let element of this.clients[client]){

            let id: JQuery = element
            let dataString: string = id.data().type
            let childs: JQuery = $(container.children());

            for (let child of childs){

                let getChild = $(child).data()

                if (id.data() == getChild) {

                    console.log('test')

                    container.removeData(getChild.type)
                }
            }
        }
    }

    delete(x: number, element: JQuery): void {

        const currentArray = this.clients[x]
        
        for (let elem of currentArray){
            
            if (elem.is(element)) {

                currentArray.splice($.inArray(elem, currentArray), 1)
            }
        }
        // console.log(currentArray.indexOf(element))
        // currentArray.splice($.inArray(element, currentArray), 1)
        // currentArray.splice(0, 1, element)
    }

    save(x: number, element: JQuery): void {

        this.clients[x].push(element)
    }

    display(x?:number): App {

        let client = x || 1 as number

        let basket = new Basket().display(client)

        this.currentBasket = basket;// On set le basket en cours

        if( !this.clients[client] )
            this.clients[client] = []

        this.read(1, $('.under-container'))
        this.dragandDrop(client)
        console.log(this.clients)

        return this;
    }

    currentClient(): App {

        const self = this
        
        this.$button.on('click', function(){

            let value:number = $(this).val() as number
            
            self.currentBasket.get$title.remove()
            self.currentBasket.get$dom.remove() // On demande à remove le 'basket' en question 
                                                // On set le nouveau basket :
            self.display(value)              
        })

        return this
    }
}
