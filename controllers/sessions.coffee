passport = require 'passport'

exports.login = (req, res, next) ->
    unless req.body.email || req.body.password
        res.json 
            code : 400
            message : 'no params'

    passport.authenticate('local-login', session: false,  (code, user, message) ->
        #set results json
        results =
            code    : code
            message : message

        #set user if login success
        results.user = user if user

        res.json results

    )(req, res, next)