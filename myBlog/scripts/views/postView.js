class PostView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this.mainContentSelector = mainContentSelector;
    }

    showCreatePostPage(isLoggedIn, isAdmin, username) {
        let _that = this;
        if (isLoggedIn && isAdmin) {
            $.get('templates/admin-page.html', function (template) {
                let renderContainer = Mustache.render(template, null);
                $(_that._containerSelector).html(renderContainer);
                $.get('templates/create-post.html', function (template) {
                    let renderMain = Mustache.render(template, null);
                    $(_that.mainContentSelector).html(renderMain);

                    $("#createPostButton").bind('click', function (ev) {
                       
                        
                         let title=$('#blogTitle').val();
                         let content=$('#blogContent').val();
                         let data={
                         commentTitle: title,
                         commentContent: content
                         };

                         triggerEvent('createPost',data);
                    });
                });
            });
        }
    }

}
