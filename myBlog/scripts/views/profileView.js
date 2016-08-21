class ProfileView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showProfilePage(userData, isAdmin) {
        let _that = this;
        let menuTemplateUrl;
        if (isAdmin) {
            menuTemplateUrl = 'templates/admin-menu.html';
        }
        else {
            menuTemplateUrl = 'templates/user-page.html';
        }
        $.get(menuTemplateUrl, function (template) {
            let renderMenu = Mustache.render(template, null);
            $(_that._containerSelector).html(renderMenu);

            console.log(renderMenu);
            $.get('templates/profile-page.html', function (template) {
                let profileData = {
                    username: userData.username,
                    firstname:userData.firstname,
                    lastname:userData.lastname,
                    gender:userData.gender,
                    imgurl:userData.imgurl
                };
                let renderProfilePage = Mustache.render(template, profileData);
                console.log("profile renderer"+renderProfilePage);
                $("#profilePage").html(renderProfilePage);
            });


        });


    }

    showEditProfilePage(isAdmin) {
        let _that = this;
        let menuTemplateUrl;
        if (isAdmin) {
            menuTemplateUrl = 'templates/admin-menu.html';
        }
        else {
            menuTemplateUrl = 'templates/user-page.html';
        }
        $.get(menuTemplateUrl, function (template) {
            let renderMenu = Mustache.render(template, null);
            $(_that._containerSelector).html(renderMenu);
            $.get('templates/profile-page-edit.html', function (template) {
                let renderEditProfilePage = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderEditProfilePage);
                $('#submitEditProfilePage').bind('click', function (ev) {
                    let gender="";
                    let firstName;
                    let lastName;
                    if ($("#firstName").val()!=""){
                        firstName=$("#firstName").val();
                    }
                    else{
                        firstName=sessionStorage['firstname'];
                    }
                    if ($("#lastName").val()!=""){
                        lastName=$("#lastName").val();
                    }
                    else{
                        lastName=sessionStorage['lastname']
                    }
                    if($("#maleRadioButton").is(':checked')){
                        gender="Male";
                    }
                    else if($("#femaleRadioButton").is(':checked')){
                        gender="Female";
                    }
                    else{
                        gender=sessionStorage['gender'];
                    }
                    let data={
                        firstname:firstName,
                        lastname:lastName,
                        gender:gender
                    };
                    triggerEvent('submitUserData',data);
                });
                $('#cancelEditProfilePage').bind('click',function(){
                    redirectUrl("#/profile");
                });
            });
        });

    }
}
