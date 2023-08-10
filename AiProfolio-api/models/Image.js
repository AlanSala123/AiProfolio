const pool = require("../config/database.js")
const zlib = require('zlib');
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js")
const crypto = require("crypto");


class Image {
  static async fetchByPortfolioId(portfolio_id) {
    try {
      const result = await pool.query(
        `SELECT * FROM images WHERE portfolio_id=$1`,
        [portfolio_id]
      );
      
      return result.rows;
    } catch (error) {
      throw new InternalServerError("Image Query");
    }
  }

  static async insertImage({image, label}, portfolioId) {
    try {
      const compressedBuffer = zlib.gzipSync(image.buffer);
      const result = await pool.query(
        `INSERT INTO images (id, portfolio_id, label, serialized, mimetype) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,

        //Generating portfolio id 
        [crypto.randomBytes(8).toString('hex'), portfolioId, label, compressedBuffer, image.mimetype]
      );
      return result.rows[0];
    } catch (error) {
      throw new InternalServerError("Failed to create image");
    }
  }

  static async deleteByPortfolioId(protfolioId) {
    try {
      await pool.query(`DELETE FROM images WHERE template_id=$1`, [protfolioId]);
    } catch (error) {
      throw new InternalServerError("Error Deleting Template Image");
    }
  }
}

module.exports = Image;
