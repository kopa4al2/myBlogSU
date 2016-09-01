class HomeView {
    constructor(containerSelector, mainContentSelector) {
        this._containerSelector = containerSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(mainData, commentData) {
        let _that = this;
        $.get('templates/default-guest-page.html', function (template) {
            let renderContainer = Mustache.render(template, null);
            $(_that._containerSelector).html(renderContainer);
        });

        for (let post of mainData) {
            post['date'] = moment(post._kmd.ect).format("MMM Do YYYY");
        }
        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData
            };

            let renderPosts = Mustache.render(template, blogPosts);
            setTimeout(function () {
                $("#blogPost").html(renderPosts);
                for (let blog of mainData) {
                    let comments = {
                        comments: null
                    };
                    let commentObjects = [];
                    for (let comment of commentData) {
                        comment['creationDate'] = moment(comment._kmd.ect).format("MMM Do YYYY");
                        if (comment.PostId == blog._id) {
                            commentObjects.push(comment);
                        }
                    }
                    comments['comments'] = commentObjects;
                    $.get('templates/comments.html', function (template) {
                        let currentCommentUrl = "#comments-" + blog._id;
                        let renderComments = Mustache.render(template, comments);
                        $(currentCommentUrl).html(renderComments);

                    });
                }
                $('.commentForm').find('.form-control').attr("disabled", "disabled");
                $('.commentForm').find('.btn-sm').on('click', function () {
                    showPopup('error', "Please log in to comment");
                });
            }, 200);
        });
    };

    showUserPage(mainData, commentData) {
        let _that = this;
        $.get('templates/default-user-page.html', function (template) {
            let renderContainer = Mustache.render(template, null);
            $(_that._containerSelector).html(renderContainer);
        });
        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData

            };
            for (let post of mainData) {
                post['date'] = moment(post._kmd.ect).format("MMM Do YYYY");
            }
            let renderPosts = Mustache.render(template, blogPosts);
            setTimeout(function () {
                $("#blogPost").html(renderPosts);
                for (let blog of mainData) {
                    let comments = {
                        comments: null
                    };
                    let commentObjects = [];
                    for (let comment of commentData) {
                        comment['creationDate'] = moment(comment._kmd.ect).format("MMM Do YYYY");
                        if (comment.PostId == blog._id) {
                            commentObjects.push(comment);
                        }
                    }
                    comments['comments'] = commentObjects;
                    $.get('templates/comments.html', function (template) {
                        let currentCommentUrl = "#comments-" + blog._id;
                        let renderComments = Mustache.render(template, comments);
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
            }, 200)
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
            for (let post of mainData) {
                post['date'] = moment(post._kmd.ect).format("MMM Do YYYY");
            }
            let renderPosts = Mustache.render(template, blogPosts);
            //RENDER POSTS AND COMMENTS
            setTimeout(function () {
                $("#blogPost").html(renderPosts);
                for (let blog of mainData) {
                    let comments = {
                        comments: null
                    };
                    let commentObjects = [];
                    for (let comment of commentData) {
                        comment['creationDate'] = moment(comment._kmd.ect).format("MMM Do YYYY");
                        if (comment.PostId == blog._id) {
                            if (commentObjects.length >= 5) {
                                //TODO HIDE COMMENTS
                            }
                            commentObjects.push(comment);
                        }
                    }
                    comments['comments'] = commentObjects;
                    $.get('templates/comments.html', function (template) {
                        let currentCommentUrl = "#comments-" + blog._id;
                        let renderComments = Mustache.render(template, comments);
                        $(currentCommentUrl).html(renderComments);
                        //TODO TAKE IT OUT OF THE FOR CYCLE
                        $(".commentList").find('.boton').show();
                        $(".commentList").find('.boton').bind('click', function () {
                            let deleteData = this.id;
                            triggerEvent('delComment', deleteData);
                        });

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
            }, 200);


        });

    }

}