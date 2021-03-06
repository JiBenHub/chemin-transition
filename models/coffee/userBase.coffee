bcrypt    = require 'bcrypt-nodejs'
randtoken = require 'rand-token'
mongoose  = require 'mongoose'
Schema    = mongoose.Schema
util      = require 'util'


userBaseSchema = ->
    Schema.apply(@, arguments);

    @add
        local:
            email        : type: String, required: true
            password     : type: String, required: true
            token        : String, 
            enable       : type: Boolean, default: true
        image: type: String
        skills:[{ type:Schema.ObjectId, ref:"Skill", unique: true, childPath:"users"}]
    #methods ======================
    #generating a hash
    @methods.generateHash = (password) ->
        bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

    #checking if password is valid
    @methods.validPassword = (password) ->
        bcrypt.compareSync(password, @local.password);

    #generate token
    @methods.generateToken = ->
        @local.enable = true
        @local.token = randtoken.generate(16);

    @pre 'save', (next) ->
        @generateToken() if @isNew
        next();

util.inherits userBaseSchema, Schema

module.exports = userBaseSchema 