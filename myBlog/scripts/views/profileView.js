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
        });

        $.get('templates/profile-page.html', function (template) {

            let profileData={profilePage: ['stefa']};
            let renderer=Mustache.to_html(template,profileData);
            console.log(renderer);
            let renderProfilePage = Mustache.render(template, profileData); //todo
            console.log(renderProfilePage);
            //$(_that._mainContentSelector).html(renderProfilePage);
            $("#profilePage").html(renderer);
        });
    }

    showEditProfilePage(isAdmin) {
        let _that = this;
        let menuTemplateUrl;
        if (isAdmin) {
            menuTemplateUrl = 'templates/admin-page.html';
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
                    //TODO
                })
            });
        });

    }
}
