const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routes
require('./routes/processorAPI')(app)

app.use(express.static(path.join(__dirname, '../', 'frontend')))

app.use(function(err, req, res, next) {
    if(!res.headersSent)
    {
        if(err) console.log(err)
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        if(typeof err == 'string') res.status(parseInt(err)||500).send(err)
        else res.status(500).send('500: unexpected error')
    }
    next(JSON.stringify(err))
})

module.exports = server
