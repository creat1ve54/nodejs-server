require('dotenv').config()

const express = require('express')
const sequelize = require('./db')

const PORT = 5002
const cors = require('cors');
const fileUpload = require("express-fileupload")
const path = require('path')
const router = require('./routes/index')
const models = require('./models/models')

const app = express()


app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('static'))



app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()