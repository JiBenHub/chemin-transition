express       = require('express')
router        = express.Router()
users         = require('./api/users');
sessions      = require('./api/sessions');
authorization = require('../authorization');
categories    = require('./api/categories')

router.use '/users', users
router.use '/sessions', sessions 
router.use '/categories', categories

module.exports = router