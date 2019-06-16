const express = require('express')
const bodyParser = require('body-parser')

// Create app
const app = express()
// Use body-parser
app.use(bodyParser.json())

// Require already connected mongoose instance (db)
const mongoose = require('./db')
mongoose.Promise = global.Promise

// Routes middlewares
const userRoutes = require('./src/routes/user')
const eventRoutes = require('./src/routes/event')

app.use('/user', userRoutes)
app.use('/event', eventRoutes)

app.set('port', process.env.PORT || 4000)
const PORT = app.get('port')
// Listen to PORT
app.listen(PORT, () => {
    console.log(`Listening to the PORT: ${PORT}!`)
})