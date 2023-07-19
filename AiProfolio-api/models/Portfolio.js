// Import required modules and dependencies
const pool = require("../config/database.js")
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js")
const crypto = require("crypto")

// Define the Portfolio class
class Portfolio {
  // Fetch a portfolio by its ID
  static async fetchPortfolio(id) {
    try {
      // SELECT query to fetch the portfolio with the given ID
      const result = await pool.query(`SELECT * FROM portfolios WHERE id=$1`, [
        id,
      ]);

      // If no result is found, throw a NotFoundError
      if (result.rows.length === 0) {
        throw error;
      }

      // Return the first row of the result
      return result.rows[0];
    } catch (error) {
      // Throw a NotFoundError if an error occurs during the execution of the query
      throw new NotFoundError("Not Found");
    }
  }

  // Fetch all portfolios associated with a user
  static async fetchByUser(user_id) {
    try {
      // Execute a SELECT query to fetch all portfolios with the given user_id
      const result = await pool.query(
        `SELECT * FROM portfolios WHERE user_id=$1`,
        [user_id]
      );

      // If no result is found, throw a NotFoundError
      if (result.rows.length === 0) {
        throw error;
      }

      // Return an array of rows from the result
      return result.rows;
    } catch (error) {
      // Throw a NotFoundError if an error occurs during the execution of the query
      throw new NotFoundError("Not Found");
    }
  }

  // Create a new portfolio
  static async createPortfolio(portfolioData) {
    try {
      // Destructure the portfolioData object to extract the required fields
      const {name, user_id, template_id, code, created_at } = portfolioData;

      // Execute an INSERT query to create a new portfolio with the provided data
      const result = await pool.query(
        `INSERT INTO portfolios (id, name, user_id, template_id, code, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [crypto.randomBytes(8).toString('hex'), name, user_id, template_id, code, created_at]
      );

      // Return the inserted row
      return result.rows[0];
    } catch (error) {
      // Throw an InternalServerError if an error occurs during the execution of the query
      throw new InternalServerError("Failed to create portfolio");
    }
  }

  // Update an existing portfolio
  static async updatePortfolio(id, updatedData) {
    try {
      // Destructure the updatedData object to extract the required fields
      const { name, code } = updatedData;

      // Execute an UPDATE query to update the portfolio with the provided data
      const result = await pool.query(
        `UPDATE portfolios 
         SET name = $1, code = $2
         WHERE id = $3
         RETURNING *`,
        [name, code, id]
      );

      // If no portfolio is found with the given ID, throw a NotFoundError
      if (result.rows.length === 0) {
        throw new NotFoundError("Portfolio not found");
      }

      // Return the updated row
      return result.rows[0];
    } catch (error) {
      // Throw an InternalServerError if an error occurs during the execution of the query
      throw new InternalServerError("Failed to update portfolio");
    }
  }

  // Delete a portfolio
  static async deletePortfolio(id) {
    try {
      // Execute a DELETE query to delete the portfolio with the given ID
      await pool.query(`DELETE FROM portfolios WHERE id=$1`, [id]);
    } catch (error) {
      // Throw an InternalServerError if an error occurs during the execution of the query
      throw new InternalServerError("Error Deleting Template");
    }
  }
}

// Export the Portfolio class to be used by other modules
module.exports = Portfolio;
