const bcrypt = require("bcrypt")
const pool = require("../config/database.js")
const jwt = require("jsonwebtoken")
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js")

const crypto = require("crypto")
require('dotenv').config()
const secretKey = process.env.JWT_SECRET

class User {

  static verifyToken(token) {
    if (typeof token !== "string")
      throw new InvalidCredentialsError(`Token not a string, its a ${typeof token}`)
    try{
      let verified = jwt.verify(token, secretKey)
      if (verified) {
        let decoded = jwt.decode(token)
        return decoded
      }
    } catch {
      throw new InvalidCredentialsError("Invalid Token")
  }
}

  static generateAuthToken(user) {
    let payload = {
      id : user.id, 
      first_name : user.first_name,
      email : user.email
    }
    let token = jwt.sign(payload, secretKey, { expiresIn: "3d" })
    return token
  }

  // Fetch User by any email or id
  static async fetch(column, value){
    if (!(column.toLowerCase() === "email") && !(column.toLowerCase() === "id")) {
      throw new FieldValidationError("Invalid Column Specified in User Fetch")
    }
      try {
        const result = await pool.query(`SELECT * FROM users WHERE ${column}=$1`, [value])
        if (result.rows.length) {
          const user = result.rows[0]
          return user
          } else {
              throw new NotFoundError("User Not Found")
        }
      } catch (error) {
        throw error
      }
  }

  static async create({password, email, first_name}){
    this.validateEmail(email)
    this.validatePassword(password)

    let user

    try {
      user = await User.fetch("email", email)
    } catch(error){
      console.log( error)
    }
    if (user)
      throw new InternalServerError("Email already exists")
    
    try {
      const result = await pool.query(`INSERT INTO users(id, password, first_name, email) VALUES($1,$2,$3,$4) RETURNING *`,[
        crypto.randomBytes(8).toString('hex'),
        bcrypt.hashSync(password, 15),
        first_name,
        email
      ])
      return result.rows[0]
    }catch{
      throw new InternalServerError("Error Creating User")
    }
  }

  static async delete(email){
    try {
      await pool.query(`DELETE FROM users WHERE email=$1`,[email])
    } catch {
      throw new InternalServerError("Error Deleting User")
    }
  }

  static async register(registerForm){
    if(!registerForm.email || !registerForm.first_name || !registerForm.password){
      throw new FieldValidationError("Missing Field")
    }
    const user = await this.create(registerForm)
    const token = this.generateAuthToken(user)
    return {user, token}
  }

  static async login({loginForm, token}){
    try {
      const password = loginForm?.password 
      const email = token ? this.verifyToken(token)?.email : loginForm?.email
      const user = await this.fetch("email", email)

      if (token){
        if(this.verifyToken(token)){
          const newToken = this.generateAuthToken(user)
          return {newToken}
        }
      }

      if(bcrypt.compareSync(password, user.password)){
        const newToken = this.generateAuthToken(user)
        return {user, newToken}
      } else{
        throw new InvalidCredentialsError("Invalid Password")
      }

    } catch (error) {
      throw error
    }
  }

  static validateEmail(email) {
    // must start with one or more characters.
    // can be zero or more occurrences of a dot, hyphen, or underscore, followed by one or more characters.
    // after the @ symbol, there must be one or more characters for the domain name.
    // domain name can also have optional occurrences of dot, hyphen, or underscore, followed by one or more word characters.
    // domain must end with a dot followed by two or three word characters.
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailPattern.test(email)){
      return true
    }else{
      throw new FieldValidationError("Invalid Email Address")
    } 
  }

  static validatePassword(password) {
    // must contain at least one digit.
    if(!/\d/.test(password)){
      throw new FieldValidationError("Password should contain at least one digit")
    }
    // must contain at least one lowercase letter.
    if(!/[a-z]/.test(password)){
      throw new FieldValidationError("Password should contain at least one lowercase character")
    }
    // must contain at least one uppercase letter.
    if(!/[A-Z]/.test(password)){
      throw new FieldValidationError("Password should contain at least one uppercase character")
    }
    // must be a minimum of 8 characters long.
    if(password.length < 8){
      throw new FieldValidationError("Password should be at least 8 characters long")
    }
    return true
  }
}

module.exports = User
