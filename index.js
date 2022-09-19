const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 3000

const app = express()
app.listen(port, () => console.log('server port: ', port))
app.get('/', (req, res) => res.send('Testing'))

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("MongoDB cluster connection established sucessfully.")
    })
    .catch ((err) => {
        console.error(err);
    });
app.use(express.json());