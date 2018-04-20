const cors = require('cors')
const generator = require('../generator/photoGenerator')

module.exports = function(app) {

    app.post('/api/generatePhoto/', cors(), (req, res, next) => {
        generator.generatePicture(req.body || {}, res).
        then((r) => res.status(200).send(r))
            .catch((err) => next(err))
    })
}