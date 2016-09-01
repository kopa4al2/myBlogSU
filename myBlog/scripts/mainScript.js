const appId = "kid_SJOMxY0O";
const appKey = "d222d6e91909450b9987d2b90bb29410";
const baseUrl = "https://baas.kinvey.com/";
const _guestAuthToken = "f1ebfa7b-cdf4-4648-9240-6f2e7ee5bcef.BAdeztOtGwfa05SQNNINLA1czG7WpRlvlBiDe5OSw0k=";
(function () {
    let authService = new AuthorizationService(baseUrl, appId, appKey, _guestAuthToken);
    authService.initAuthorizationType("Kinvey");
    let requester = new Requester(authService)
    let selector = ".menu-container";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appId);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appId);

    let postView= new PostView(selector,mainContentSelector);
    let postController=new PostController(postView,requester,appId,baseUrl);

    let profileView=new ProfileView(selector,mainContentSelector);
    let profileController=new ProfileController(profileView,requester,baseUrl,appId);

    initEventServices();
    onRoute("#/", function () {
        if (authService.isLoggedIn() && !authService.isAdmin()) {
            homeController.showUserPage();
        }
        else if (authService.isLoggedIn() && authService.isAdmin()) {
            homeController.showAdminPage();
        }
        else if(!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
    });
    
    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        postController.showCreatePostPage(authService.isLoggedIn(),authService.isAdmin(),sessionStorage.username);
    });

    onRoute('#/profile/edit',function(){
        profileController.showEditProfilePage(authService.isAdmin());
    });
    
    onRoute('#/profile', function(){
        profileController.showProfilePage(authService.isAdmin());
    });
    bindEventHandler('comment', function (ev,data) {
        homeController.comment(data);
    });
    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
    });
    bindEventHandler('delComment', function(ev, data) {
        homeController.deleteComment(data);
    });
    bindEventHandler('submitUserData', function(ev, data){
        profileController.submitProfileData(data);
    })

    run('#/');
})();

