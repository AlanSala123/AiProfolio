const User = require('../models/user.js')
const express = require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretKey = process.env.JWT_SECRET
const cookieParser = require('cookie-parser');

const authRouter = express.Router()
authRouter.use(cookieParser());

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
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none'})
        res.send({user: user})
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

authRouter.post('/login', async (req, res)=>{
    try {
        const {user, newToken} = await User.login(req.body)
        res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.send({user: user})
    } catch (error) {
        res.status(Number(error.errorCode) || 400).send({error: error.message})
    }
})

authRouter.post('/logout', (req, res) => {
    try {
        res.clearCookie('token'); 
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        res.send(error)
    }
    });
  

authRouter.use(authMiddleware);

authRouter.get('/user', async (req, res)=>{
    try {
        const user = req.user
        res.status(200).send({user: user})
    } catch (error) {
        res.clearCookie('token'); 
        res.status(500).send({error: error.message})
    }
})

module.exports = authRouter
