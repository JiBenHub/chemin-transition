User                 = require '../models/user'
OrganizationPerson   = require '../models/organizationPerson'
mongoose             = require 'mongoose'
async                = require 'async'

exports.addActor = (req, res, next) ->
    if req.body

        if req.params.organization && req.params.person
            actor = 
                organization: req.params.organization,
                person: req.params.person,
                actor: true

            query = OrganizationPerson.where(actor)

            async.waterfall([
                (callback) ->
                    query.findOne (err, result) ->

                        unless result
                            return callback(null, true)

                        callback(null, false)
            ],
            (err, results) ->
                unless results
                    res.status(400).json('already exist')


                organizationPerson = new OrganizationPerson(actor)
                    
                organizationPerson.save (err, result) ->
                    if (err)
                        res.status(400).json(err)

                    res.status(201).json('created')
            )
        else
            res.status(400).json('Miss parameters')

exports.removeActor = (req, res, next) ->
    if req.body._id

        OrganizationPerson.remove req.params.id, (err) ->
            if (err)
                res.status(404).json(err);

            res.status(204)
    else
        res.status(400).json('Id cannot be null')
