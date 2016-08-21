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
        let requestUrlComments = this._serviceUrl + "appdata/" + this._appId + "/comments";
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._requester.get(requestUrlComments,
                    function success(commentData) {
                        _that._homeView.showUserPage(data, commentData);

                    },
                    function error(commentData) {
                        showPopup('error', "error loading comments")
                    });


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
        let requestUrlComments = this._serviceUrl + "appdata/" + this._appId + "/comments";
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._requester.get(requestUrlComments,
                    function success(commentData) {
                        _that._homeView.showGuestPage(data, commentData);

                    },
                    function error(commentData) {
                        showPopup('error', "error loading comments")
                    });

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
        let requestUrlComments = this._serviceUrl + "appdata/" + this._appId + "/comments";
        let postId;
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._requester.get(requestUrlComments,
                    function success(commentData) {
                        _that._homeView.showAdminPage(data, commentData);

                    },
                    function error(commentData) {
                        showPopup('error', "error loading comments")
                    });


            },
            function fail(data) {
                showPopup('error', "Error loading posts");
            }
        );


    };

    comment(data) {
        let commentUrl = this._serviceUrl + "appdata/" + this._appId + "/comments";
        this._requester.post(commentUrl, data,
            function success(response) {
                showPopup('success', "comment submitted");
                location.reload();
            },
            function error(response) {
                showPopup('error', "there was an error submitting your comment")
            })
    }
    deleteComment(commentId) {
        let deleteUrl=this._serviceUrl+"appdata/"+ this._appId + "/comments/" + commentId;
        this._requester.delete(deleteUrl,
        function success(response){
            showPopup('info',"deleted comment");
            location.reload();
        },
        function error(response){
            showPopup('error',"Couldnt delete comment");
            location.reload();
        });
    }
}