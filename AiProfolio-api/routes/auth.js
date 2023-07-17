const User = require('../models/user.js')
const app = require('../server.js')
const express = require('express')

const authRouter = express.Router()

authRouter.post('/register', async (req, res)=>{
    try {
        const {user, token} = await User.register(req.body)
        res.status(200).send({user: user, token: token})
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

authRouter.post('/login', async (req, res)=>{
    try {
        const {user, newToken} = await User.login(req.body)
        res.status(200).send({user: user, token: newToken})
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

module.exports = authRouter