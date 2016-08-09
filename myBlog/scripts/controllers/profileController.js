class ProfileController{
    constructor(profileView,requester,baseUrl,appId){
        this._profileView=profileView;
        this._requester=requester;
        this._baseUrl=baseUrl;
        this._appId=appId;
    }
    showProfilePage(isAdmin){
        let _that=this;
        let requestUrl=this._baseUrl+"user/"+this._appId+"/"+sessionStorage.userId;
        this._requester.get(requestUrl,
            function successCallback(responseData){
                _that._profileView.showProfilePage(responseData,isAdmin); //TODO IMPLEMENT FULL LOGIC
            },
        function error(responseData){
            showPopup('error',"Could not read profile page")
        });


    }

    showEditProfilePage(){

    }
}