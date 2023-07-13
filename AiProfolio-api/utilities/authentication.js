const bcrypt = require('bcrypt')
const crypto = require('crypto')

const {InvalidCredentialsError, NotFoundError} = require('./error.js')
const User = require('../models/user.js')

async function authenticateJWT(req, res, next){

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        throw InvalidCredentialsError(message='Token Missing in HTTP Request')
    }

    try {
        const decoded = User.verifyJWT(token)

        if (!decoded) {
            throw InvalidCredentialsError(message='Token Was Not Decoded')
            }

        const user = await User.fetchById(decoded.id)

        if (!user) {
            throw NotFoundError(message="User Was Not Found")
            }

    } catch (error) {
        throw error
    }

    next()
}


module.exports = { authenticateJWT }