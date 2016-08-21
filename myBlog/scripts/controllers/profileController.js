class ProfileController {
    constructor(profileView, requester, baseUrl, appId) {
        this._profileView = profileView;
        this._requester = requester;
        this._baseUrl = baseUrl;
        this._appId = appId;
    }

    showProfilePage(isAdmin) {
        let _that = this;
        let requestUrl = this._baseUrl + "user/" + this._appId + "/" + sessionStorage.userId;
        this._requester.get(requestUrl,
            function successCallback(responseData) {
                console.log(responseData);
                _that._profileView.showProfilePage(responseData, isAdmin); //TODO IMPLEMENT FULL LOGIC
            },
            function error(responseData) {
                showPopup('error', "Could not read profile page")
            });


    }

    showEditProfilePage(isAdmin) {
        this._profileView.showEditProfilePage(isAdmin);

    }

    submitProfileData(profileData) {
        let _that=this;
        let url=this._baseUrl + "user/" + this._appId + "/" + sessionStorage.userId
        this._requester.put(url,profileData,
            function success(response) {
                showPopup('success', "You have successfully updated your profile");
                redirectUrl("#/profile")
            },
            function error(response) {
                showPopup('error', "There was an error submiting your data")
            });
    }

}