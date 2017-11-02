System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App;
    return {
        setters: [],
        execute: function () {
            App = class App {
                constructor() {
                    this.buttonForm = $('#butt-form');
                }
                displayForm() {
                    this.buttonForm.click(() => {
                        console.log('echo');
                    });
                    return this;
                }
            };
            exports_1("App", App);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsTUFBQTtnQkFJSTtvQkFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDckMsQ0FBQztnQkFFRCxXQUFXO29CQUVQLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFFdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKLENBQUE7O1FBQUEsQ0FBQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwIHtcblxuICAgIHB1YmxpYyBidXR0b25Gb3JtOiBKUXVlcnlcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuYnV0dG9uRm9ybSA9ICQoJyNidXR0LWZvcm0nKVxuICAgIH1cblxuICAgIGRpc3BsYXlGb3JtKCk6IEFwcHtcblxuICAgICAgICB0aGlzLmJ1dHRvbkZvcm0uY2xpY2soKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWNobycpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59Il19
