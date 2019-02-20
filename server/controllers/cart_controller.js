const swag = require('../models/swag')

module.exports = {
    add: ( req, res, next ) => {
        const { id } = req.query
        let { cart, total } = req.session.user
        let index = cart.findIndex(item => item.id == id)
        if (index !== -1) {
            res.status(200).send(req.session.user)
        } else { 
            let swagIndex = swag.findIndex(item => item.id == id)
            if ( swagIndex !== -1 ) {
                cart.push(swag[swagIndex])
                total += swag[swagIndex].price
                req.session.user = { ...req.session.user, cart, total}
                res.status(200).send(req.session.user)
            } else {
                req.status(500).send('item does not exist')
            }
        }
        next()
    },
    remove: ( req, res, next ) => {
        const { id } = req.query
        let { cart, total } = req.session.user
        let index = cart.findIndex(item => item.id == id)
        total -= cart[index].price
        cart.splice(index,1)
        req.session.user = {...req.session.user, cart, total}
        res.status(200).send(req.session.user)
        next()
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
        next()
    }
}