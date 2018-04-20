const app = require('./app')
const config = require('./config')

app.listen(config.port, '0.0.0.0', () => {
    const host = app.address().address
    const port = app.address().port
    console.log('Backend listening on port', port)
})