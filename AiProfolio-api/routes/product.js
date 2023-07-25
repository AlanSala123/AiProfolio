const User = require('../models/user.js')
const app = require('../server.js')
const express = require('express')

const test = require('../models/Example.json')

const productRouter = express.Router()

productRouter.get('/view', async (req, res)=>{
    res.send(test)
})

module.exports = productRouter