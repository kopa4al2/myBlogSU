class UserView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this._mainContentSelector = mainContentSelector;
    }
    showLoginPage(isLoggedIn) {
        let _that = this;
        let templateUrl;
        if (isLoggedIn) {
            templateUrl = "templates/user-page.html"
        }
        else {
            templateUrl = "templates/guest-page.html"
        }

        $.get(templateUrl,function(template){
            let renderContainer=Mustache.render(template,null);
            $(_that._containerSelector).html(renderContainer);

            $.get('templates/login.html',function(template){
               let render=Mustache.render(template,null);
                $(_that._mainContentSelector).html(render);

                $('#loginButton').bind('click',function(ev){
                    let username=$('#username').val();
                    let password=$('#password').val();
                    let data={
                        username: username,
                        password: password
                    };

                    triggerEvent('login',data);
                    
                });

            });
        })
    };

    showRegisterPage(isLoggedIn) {
        let _that = this;
        let templateUrl;
        if (isLoggedIn) {
            templateUrl = "templates/user-page.html"
        }
        else {

            templateUrl = "templates/guest-page.html"
        }

        $.get(templateUrl,function(template){
            let renderContainer=Mustache.render(template,null);
            $(_that._containerSelector).html(renderContainer);

            $.get('templates/register.html',function(template){
                let render=Mustache.render(template,null);
                $(_that._mainContentSelector).html(render);

                $('#registerBtn').on('click',function(ev){
                    let username=$('#username').val();
                    let password=$('#password').val();
                    let confirmPwd=$('#confirmPwd').val();
                    let data={
                        username: username,
                        password: password,
                        confirmPwd: confirmPwd
                    };
                    triggerEvent('register',data);

                });
            });
        })
    };
}
