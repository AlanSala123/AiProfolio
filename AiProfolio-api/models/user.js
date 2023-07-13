const bcrypt = require("bcrypt");
const pool = require("../config/database.js");
const jwt = require("jsonwebtoken");
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
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

  static generateAuthToken(user) {
    let payload = {};
    let token = jwt.sign(payload, secretKey, { expiresIn: "30d" });
    return token;
  }

  static async fetchById(userId) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id=$1", [
        userId,
      ])

      console.log(result.rows[0])

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

  static validateEmail(email) {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  }
}

module.exports = User;
