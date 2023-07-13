const bcrypt = require("bcrypt");
const pool = require("../config/database.js");
const jwt = require("jsonwebtoken");
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

class User {
  static verifyToken(token) {
    if (typeof token !== "string")
      throw InvalidCredentialsError(
        (message = `Token not a string, its a ${typeof token}`)
      );
    let verified = jwt.verify(token, secretKey);
    if (verified) {
      let decoded = jwt.decode(token);
      return decoded;
    } else {
      throw InvalidCredentialsError((message = "Invalid Token"));
    }
  }

  // TO DO: FILL OUT PAYLOAD
  static generateAuthToken(user) {
    let payload = {};
    let token = jwt.sign(payload, secretKey, { expiresIn: "30d" });
    return token;
  }


  // Fetch User by any specified column and value
  static async fetch(column, value){
    if (!(column.toLowerCase() === "email") && !(column.toLowerCase() === "id")) {
      throw new FieldValidationError("Invalid Column Specified in User Fetch");
    }
      try {
        const result = await pool.query(`SELECT * FROM users WHERE ${column}=$1`, [value])
        if (result.rows.length) {
          const user = result.rows[0];
          return user;
          } else {
              throw new NotFoundError("User Not Found");
        }
      } catch (error) {
        throw error
      }
  }


  static async login({loginForm, token}){
    try {

      const email = token ? this.verifyToken(token).email : loginForm.email
      const user = await this.fetch("email", email)
      const newToken = this.generateAuthToken(user)

      return {user, newToken}

    } catch (error) {
      throw error
    }
  }

  static validateEmail(email) {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  }
}

module.exports = User;
