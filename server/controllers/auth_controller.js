const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res, next) => {
        const { username, password } = req.body
        let index = users.findIndex(user => {
            return user.username == username
            && user.password == password})
            
            if (index !== -1) {
                req.session.user.username = username
                res
                .status(200)
                .send(req.session.user)
            } else {
                res
                .status(500)
                next()
            }
        },
        register: (req, res, next) => {
        const { username, password } = req.body
        users.push({id, username, password})
        id++
        req.session.user.username = username
        res.status(200).send(req.session.user)
        next()
    },
    signout:( req, res, next ) => {
        req.session.destroy()
        res.status(200).send(req.session)
        next()
    },
    getUser: ( req, res, next ) => {
        res.status(200).send(req.session.user)
        next()
    }
}