const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const invoice_routes = require('./src/routes/invoice.routes')

const port = process.env.PORT || 3000

const app = express()
app.listen(port, () => console.log('server port: ', port))

app.use(express.json());
app.use('/api', invoice_routes)

app.get('/', (req, res) => res.send('Testing'))

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("MongoDB cluster connection established sucessfully.")
    })
    .catch ((err) => {
        console.error(err);
    });