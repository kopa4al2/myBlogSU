class HomeView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(mainData,commentData) {
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

            for (let blog of mainData) {
                let comments={
                    comments:null
                };
                let commentObjects=[];
                for (let comment of commentData) {
                    if (comment.PostId == blog._id) {
                        commentObjects.push(comment);
                    }
                }
                comments['comments']=commentObjects;
                $.get('templates/comments.html', function (template) {
                    let currentCommentUrl="#comments-"+blog._id;
                    let renderComments=Mustache.render(template,comments);
                    $(currentCommentUrl).html(renderComments);
                });
            }
            $('.commentForm').find('.form-control').attr("disabled","disabled");
            $('.commentForm').find('.btn-sm').on('click', function () {
                showPopup('error',"Please log in to comment");
            });

        });
    };

    showUserPage(mainData,commentData) {
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
            $("#blogPost").html(renderPosts);
            //<experimental>
            for (let blog of mainData) {
                let comments={
                    comments:null
                };
                let commentObjects=[];
                for (let comment of commentData) {
                    if (comment.PostId == blog._id) {
                        commentObjects.push(comment);
                    }
                }
                comments['comments']=commentObjects;
                $.get('templates/comments.html', function (template) {
                    let currentCommentUrl="#comments-"+blog._id;
                    let renderComments=Mustache.render(template,comments);
                    $(currentCommentUrl).html(renderComments);
                });

            }

            $('.commentForm').find('.btn-sm').on('click', function () {
                let textAreaId = "comment-" + this.id;
                let postId = this.id;
                let content = document.getElementById(textAreaId).value;
                let currentUserUsername = sessionStorage.username;
                let data = {
                    PostId: postId,
                    commentAuthor: currentUserUsername,
                    commentContent: content
                };
                triggerEvent('comment', data);
            });


//</experimental>
        });

    }

    showAdminPage(mainData, commentData) {
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
            $("#blogPost").html(renderPosts);
            //experimental part
            for (let blog of mainData) {
                let comments={
                    comments:null
                };
                let commentObjects=[];
                for (let comment of commentData) {
                    if (comment.PostId == blog._id) {
                        commentObjects.push(comment);
                    }
                }
                comments['comments']=commentObjects;
                $.get('templates/comments.html', function (template) {
                    let currentCommentUrl="#comments-"+blog._id;
                    let renderComments=Mustache.render(template,comments);
                    $(currentCommentUrl).html(renderComments);
                });
            }


            $('.commentForm').find('.btn-sm').on('click', function () {
                let textAreaId = "comment-" + this.id;
                let postId = this.id;
                let content = document.getElementById(textAreaId).value;
                let currentUserUsername = sessionStorage.username;
                let data = {
                    PostId: postId,
                    commentAuthor: currentUserUsername,
                    commentContent: content
                };
                triggerEvent('comment', data);
            });


        });
// </experimental part>

    }

}