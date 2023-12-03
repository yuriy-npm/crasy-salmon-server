require('dotenv').config()
const express = require('express')
const {sequelize} = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')


const app = express()

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router) 



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start ()