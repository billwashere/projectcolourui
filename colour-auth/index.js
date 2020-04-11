const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { signIn, welcome, refresh } = require('./handlers')
const port = process.env.AUTHSERVER_PORT || 8000

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', signIn)
app.get('/welcome', welcome)
app.post('/refresh', refresh)

app.listen(port, () => console.log(`Auth Server running on port ${port}`))