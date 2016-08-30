class PostController {
    constructor(postView, requester, appId, kinveyUrl) {
        this._postView = postView;
        this._requester = requester;
        this._appId = appId;
        this._baseUrl = kinveyUrl;
    }

    showCreatePostPage(isLoggedIn,isAdmin,username) {
        this._postView.showCreatePostPage(isLoggedIn,isAdmin,username);
    }
    createPost(requestData){
        if(requestData.title.length<5){
            showPopup('error',"Title cant be shorter than 5 symbols")
            return;
        }
        if(requestData.content.length<30){
            showPopup('error',"Post content too short, post should be atleast 30 characters");
            return;
        }
        let requestUrl = this._baseUrl + "appdata/" + this._appId + "/posts";
        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success',"Succesfully posted your post");
                redirectUrl("#/");

            },
            function error(data) {
                showPopup('error',"post submiting failure");
            });
    }
}
