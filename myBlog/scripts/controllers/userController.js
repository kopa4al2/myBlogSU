class UserController {
    constructor(userView, requester, baseUrl, appId) {
        this._userView=userView;
        this._requester = requester;
        this._appId = appId;
        this._baseUrl = baseUrl;
    }

    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);
    }

    login(requestData) {
        let ajaxUrl = this._baseUrl+"user/" +appId+"/"+ "login";
        this._requester.post(ajaxUrl, requestData,
            function success(data) {
                showPopup('success',"You have successfully logged in");
                let responseData=data;
                sessionStorage['username']=data.username;
                sessionStorage['_authToken']=data._kmd.authtoken;
                sessionStorage['userId']=data._id;
                //TODO USER'S NAME
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error',"Invalid account or password");
            });
    }

    register(requestData) {
        if (requestData.username.length < 5) {
            showPopup('error', "Username must be atleast 5 characters long");
            return;
        }
        if (requestData.password.length < 8) {
            showPopup('error', "Password must be atleast 8 symbols long");
            return;
        }
        if (requestData.password != requestData.confirmPwd) {
            showPopup('error', "Passwords don't match");
            return;
        }

        delete requestData['confirmPwd'];
        let ajaxUrl = this._baseUrl + "user/" +appId +"/";
        this._requester.post(ajaxUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully registered.");
                redirectUrl("#/login");
            },
            function error(data) {
                showPopup('error',"Username already taken, please choose another");
            }
        );
    }

    logout() {
        sessionStorage.clear();
        redirectUrl("#/");
    }
}
