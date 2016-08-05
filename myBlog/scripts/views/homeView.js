class HomeView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(mainData) {
        let _that = this;
        $.get('templates/default-guest-page.html', function (template) {
            let renderContainer = Mustache.render(template, null);
            $(_that._containerSelector).html(renderContainer);
        });
        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData
            };

            let renderPosts = Mustache.render(template, blogPosts);
            $("#blogPost").html(renderPosts)
        });
    };

    showUserPage(mainData) {
        let _that = this;
        $.get('templates/default-user-page.html', function (template) {
            let renderContainer = Mustache.render(template, null);
            $(_that._containerSelector).html(renderContainer);
        });
        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData
            
            };
            let renderPosts = Mustache.render(template, blogPosts);
            $("#blogPost").html(renderPosts)
        });
    }

    showAdminPage(mainData) {
        let _that = this;
        $.get('templates/admin-page.html', function (template) {
            let renderContainter = Mustache.render(template, null);
            $(_that._containerSelector).html(renderContainter);
        });
        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData
            };

            let renderPosts = Mustache.render(template, blogPosts);
            $("#blogPost").html(renderPosts)
        });
    }

}