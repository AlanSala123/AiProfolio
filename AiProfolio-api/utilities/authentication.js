const bcrypt = require('bcrypt')
const crypto = require('crypto')

const {InvalidCredentialsError, NotFoundError} = require('./error.js')
const User = require('../models/user.js')

async function authenticateJWT(req, res, next){
    
}


module.exports = { authenticateJWT }