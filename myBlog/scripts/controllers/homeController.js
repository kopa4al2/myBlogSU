class HomeController {
    constructor(homeView, requester, serviceUrl, appId) {
        this._homeView = homeView;
        this._requester = requester;
        this._serviceUrl = serviceUrl;
        this._appId = appId;
    }

    showUserPage() {
        let _that = this;
        //let recentPosts = [];
        let requestUrl = this._serviceUrl + "appdata/" + this._appId + "/posts";
        
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                _that._homeView.showUserPage(data);
            },
            function fail(data) {
                showPopup('error', "Error loading posts");
            }
        );
    };

    showGuestPage() {
        let _that = this;
        let recentPosts = [];
        let requestUrl = this._serviceUrl + "appdata/" + this._appId + "/posts";

        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                _that._homeView.showGuestPage(data);
            },
            function fail(data) {
                showPopup('error', "Error loading posts");
            }
        );
    };

    showAdminPage() {
        let _that = this;
        let recentPosts = [];
        let requestUrl = this._serviceUrl + "appdata/" + this._appId + "/posts";

        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._homeView.showAdminPage(data);

            },
            function fail(data) {
                showPopup('error', "Error loading posts");
            }
        );
    };
}