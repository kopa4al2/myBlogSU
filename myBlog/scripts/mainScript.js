const appId = "kid_SJOMxY0O";
const appKey = "d222d6e91909450b9987d2b90bb29410";
const baseUrl = "https://baas.kinvey.com/";
const _guestAuthToken = "f1ebfa7b-cdf4-4648-9240-6f2e7ee5bcef.BAdeztOtGwfa05SQNNINLA1czG7WpRlvlBiDe5OSw0k=";
(function () {
    let authService = new AuthorizationService(baseUrl, appId, appKey, _guestAuthToken);
    authService.initAuthorizationType("Kinvey");
    let requester = new Requester(authService);

    let menuSelector=".container-fluid";
    let selector = ".menu-container";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appId);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appId);

    let postView= new PostView(selector,mainContentSelector);
    let postController=new PostController(postView,requester,appId,baseUrl)

    let profileView=new ProfileView(selector,mainContentSelector);
    let profileController=new ProfileController(profileView,requester,baseUrl,appId);

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

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
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
    });
    
    
    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
    });

    onRoute("#/login", function () {
        // Show the login page...
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
        // Show the new post page...
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

        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {

        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
        // Create a new post...
    });

    run('#/');
})();

