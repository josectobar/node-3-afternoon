const swag = require('../models/swag')

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query
        const filterSwag = swag.filter(item => {
            console.log(item.category == category);
            return item.category === category})
            console.log(filterSwag);

        filterSwag.length === 0
        ?
            res.status(200).send(swag)
        : 
            res.status(200).send(filterSwag)
        next()
    }
}