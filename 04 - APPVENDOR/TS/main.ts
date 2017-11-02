import { App } from "./App";

var app: App = new App().init();

$('#back').click(() => {

    var read = localStorage.getItem('vendorID');
    var id = JSON.parse(read);

    $('form').remove();
    $('section').data('section', 'product').remove();
    $('section').data('section', 'list').remove();
    $('section').data('section', 'category').remove();

    var app: App = new App().init(id);
});

window.onbeforeunload = function(){
    localStorage.removeItem('vendorID');
}

