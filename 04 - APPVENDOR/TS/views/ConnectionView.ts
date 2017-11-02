export class ConnectionView {


    public $form: JQuery;

    constructor(){

        this.$form = null;
    }

    display(): ConnectionView {

        let dom = `<form>
                        <input type="text" name="username" id="username" placeholder="username">
                        <input type="password" name="password" id="password" placeholder="password">
                        <input type="submit" name="" id="submit">
                   </form>`;

        let $dom = $(dom);

        $('body').append($dom);

        return this;
    }

    whoSubmit(): Promise<any> {

        this.$form = $('form');

        return new Promise((resolve: any, reject: any) => {

            this.$form.on('submit', (e: any) => {

                e.preventDefault();

                let $username = $('#username').val();
                let $password = $('#password').val();


                $.ajax({

                    url: `http://localhost:3088/winests/checkUserExist`,
                    method: `POST`,
                    dataType: `JSON`,
                    data: {
                        'username': $username,
                        'password': $password
                    },
                    success: (data: Array<{}> | boolean) => {

                        resolve(data);
                    },
                    error: error => {

                        reject(error);
                    }
                }); 
            });
        });
    }
}