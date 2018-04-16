const cors = require('cors')
const generator = require('../generator/photoGenerator')

module.exports = function(app) {

    app.post('/api/generatePhoto/', cors(), (req, res, next) => {
        generator.generatePicture(redis, req.body || {}).then((r) => res.status(200).send(r)).catch((err) => next(err))
    })

}