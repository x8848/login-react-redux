const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret'

const app = express()
app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())

app.get('/', function (req, res) { res.sendFile(path.join('build', 'index.html')) })

app.post('/login', function (req, res) {
    let token = jwt.sign({ name: req.name }, JWT_SECRET, { expiresIn: '1h' })
    res.status(200).send({ name: req.body.name, token: token })   // Any user Test LogIn with JWT
})

app.post('/auth', function (req, res) {
    jwt.verify(req.body.token, JWT_SECRET, (err, decoded) => {
        err ? res.status(401).send() : res.status(200).send()
    })
})

app.post('/logout') // TODO implement JWT logout blacklist storage for more security

const port = process.env['PORT'] || 8080

app.listen(port, () => console.log(`App started at ${port}`))
