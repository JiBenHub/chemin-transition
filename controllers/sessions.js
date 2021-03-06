var User, passport;

passport = require('passport');

User = require('../models/user');

/**
 * [login user]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.login = function(req, res, next) {
    if (!(req.body.email || req.body.password)) {
        return res.status(400).json({
            message: 'no params'
        });
    }
    passport.authenticate('local-login', function(user) {
        if (user) {
            res.status(200).json(user.serialize());
        } else {
            res.status(400).json('wrong');
        }
    })(req, res, next);
};
