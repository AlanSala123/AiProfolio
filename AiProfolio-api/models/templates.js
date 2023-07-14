const pool = require("../config/database.js")
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js")

const crypto = require("crypto")

class templates {
    //fetch a template by the id
    static async fetchByID(id) {
        try{
            const result = pool.query(`SELECT * FROM templates WHERE id=$1`, [id])
            return result.rows[0]
        }catch (error){
            throw new NotFoundError("Template Not Found")
        }
    }
}