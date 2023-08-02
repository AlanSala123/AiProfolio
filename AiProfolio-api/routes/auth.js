const User = require('../models/user.js')
const express = require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretKey = process.env.JWT_SECRET
const cookieParser = require('cookie-parser');

const authRouter = express.Router()
authRouter.use(cookieParser());
const secure = false

const authMiddleware = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).send({ error: 'Not authenticated' });
    }

    try {
        const user = User.verifyToken(token); 
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authenticated' });
    }
}

authRouter.post('/register', async (req, res)=>{
    try {
        const {user, token} = await User.register(req.body)
        res.cookie('token', token, { httpOnly: true, secure: secure, sameSite: 'Strict'})
        res.send(user)
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

authRouter.post('/login', async (req, res)=>{
    try {
        const {user, newToken} = await User.login(req.body)
        console.log(user, newToken)
        res.cookie('token', newToken, { httpOnly: true, secure: false, sameSite: 'Strict' });
        res.send({user: user})
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

authRouter.post('/logout', (req, res) => {
      res.clearCookie('token'); 
      return res.status(200).json({ message: "Logged out successfully." });
    });
  

authRouter.use(authMiddleware);

authRouter.get('/user', async (req, res)=>{
    console.log("Bruh")
    try {
        console.log(req.user)
        const user = req.user
        console.log(user)
        res.status(200).send({user: user})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
})

module.exports = authRouter
