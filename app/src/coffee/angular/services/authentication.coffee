app.service 'authService', (ipCookie, userData, $state, $modal) ->
    user: {},
    token: null,
    needsLogin: false,

    setSession: (user) ->
        @user = user
        @token = user.token

        ipCookie('token', @token)
        ipCookie('email', @user.email)

    isAuthorize:  ->
        unless ipCookie('token') || ipCookie('mail')
            @needsLogin = true
            return $state.go('index')

        userData.checkUser().then (result) ->
            unless result == 204
                return $state.go('index')

    showLogin: ->
        @login = $modal.open
            templateUrl: 'partials/login.html',
            controller: 'loginController'

        @login.result.then (selectedItem) ->
            $scope.selected = selectedItem;

    hideLogin: ->
        @login.dismiss('cancel');

    showRegister: (size) ->
        @register = $modal.open
            templateUrl: 'partials/register.html',
            controller: 'registerController'
        @register.result.then (selectedItem) ->
            $scope.selected = selectedItem

    hideRegister: ->
        @register.dismiss('cancel');



