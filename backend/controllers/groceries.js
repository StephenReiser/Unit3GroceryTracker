const express = require('express')
const groceries = express.Router()
const Grocery = require('../models/groceries')


groceries.get('/', (req, res) => {
    Grocery.find({}, (err, foundGroceries) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundGroceries)
    })
})


groceries.post('/', (req, res) => {
    Grocery.create(req.body, (error, createdGrocery) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdGrocery)
    })
})


groceries.delete('/:id', (req, res) => {
    Grocery.findOneAndRemove({_id:req.params.id}, (err, deletedGrocery) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedGrocery)
    })
})


groceries.put('/:id', (req, res) => {
    Grocery.findOneAndUpdate({_id:req.params.id}, req.body, { new: true }, (err, updatedGrocery) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedGrocery)
    })
})


module.exports = groceries