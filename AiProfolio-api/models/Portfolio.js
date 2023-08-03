const pool = require("../config/database.js")
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js")
const crypto = require("crypto");

class Portfolio {
  
  static async fetchPortfolio(id) {
    try {
      const result = await pool.query(`SELECT * FROM portfolios WHERE id=$1`, [
        id,
      ]);
      if (result.rows.length === 0) {
        throw error;
      }
      return result.rows[0];
    } catch (error) {
      throw new NotFoundError("Not Found");
    }
  }

  static async fetchByUser(user_id) {
    try {
      const result = await pool.query(
        `SELECT * FROM portfolios WHERE user_id=$1`,
        [user_id]
      );
      if (result.rows.length === 0) {
        throw error;
      }
      return result.rows;
    } catch (error) {
      throw new NotFoundError("Not Found");
    }
  }

  static async insertPortfolio(templateObj, resumeObj, userId) {

    try {
      const result = await pool.query(
        `INSERT INTO portfolios (id, user_id, template_code, resume_data) 
         VALUES ($1, $2, $3, $4)
         RETURNING *`,

        //Generating portfolio id 
        [crypto.randomBytes(8).toString('hex'), userId, JSON.stringify(templateObj), JSON.stringify(resumeObj)]
      );
      return result.rows[0];
    } catch (error) {
      //throw new InternalServerError("Failed to create portfolio");
    }
  }

  static async updatePortfolio(id, updatedData) {
    try {
      const { name, code } = updatedData;

      const result = await pool.query(
        `UPDATE portfolios 
         SET name = $1, code = $2
         WHERE id = $3
         RETURNING *`,
        [name, code, id]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("Portfolio not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerError("Failed to update portfolio");
    }
  }

  static async deletePortfolio(id) {
    try {
      await pool.query(`DELETE FROM portfolios WHERE id=$1`, [id]);
    } catch (error) {
      throw new InternalServerError("Error Deleting Template");
    }
  }
}



module.exports = Portfolio;
