const express = require('express')
const app = express()
const PORT = 3003
const groceriesControllers = require('./controllers/groceries.js')


const mongoose = require('mongoose')

//...farther down the page

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page

mongoose.connect('mongodb://localhost:27017/groceries', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

// middleware
app.use(express.json());

app.use('/groceries', groceriesControllers)


app.listen(PORT, () => {
  console.log("port:" + PORT + "works")
})
