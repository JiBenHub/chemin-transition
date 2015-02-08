app.factory 'userData', ($http, $q, appConfig, ipCookie ) ->
    login: (user) ->
        deferred = $q.defer()
        $http({method: 'POST', url: appConfig.url('sessions/login'), data: user })
            .success (data, status, headers, config) ->
                deferred.resolve(status)
            .error (data, status, headers, config) ->
                deferred.reject(status)
        deferred.promise

    checkUser: ->
        deferred = $q.defer()
        $http({method: 'GET', url: appConfig.url('sessions'), headers: {'token': ipCookie('token'), 'mail': ipCookie('mail')} })
            .success (data, status, headers, config) ->
                deferred.resolve(status)
            .error (data, status, headers, config) ->
                deferred.reject(status)
        deferred.promise    

    create: (user) ->
        deferred = $q.defer()
        $http({method: 'POST', url: appConfig.url('users'), data: user }).
            success((data, status, headers, config) ->
                deferred.resolve(status)
            ).
            error( (data, status, headers, config) ->
                deferred.reject(status)
            )
        deferred.promise

    update: (user) ->
        deferred = $q.defer()
        $http({method: 'PUT', url: appConfig.url('users'), params: {id: user._id}, data: user }).
            success((data, status, headers, config) ->
                deferred.resolve(status)
            ).
            error( (data, status, headers, config) ->
                deferred.reject(status)
            )
        deferred.promise

    delete: (id) ->
        deferred = $q.defer()
        $http({method: 'DELETE', url: appConfig.url('users'), params: {id: user._id}, data: user }).
            success((data, status, headers, config) ->
                deferred.resolve(status)
            ).
            error( (data, status, headers, config) ->
                deferred.reject(status)
            )
        deferred.promise