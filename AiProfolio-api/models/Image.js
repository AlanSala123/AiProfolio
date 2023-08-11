const pool = require("../config/database.js");
const { exec } = require('child_process');
const {
  InvalidCredentialsError,
  NotFoundError,
  InternalServerError,
  FieldValidationError,
} = require("../utilities/error.js");
const crypto = require("crypto");
const sharp = require('sharp');

let imagemin;
let imageminPngquant;
let imageminMozjpeg;

(async () => {
  imagemin = await import('imagemin');
  imageminPngquant = await import('imagemin-pngquant');
  imageminMozjpeg = await import('imagemin-mozjpeg');
})();



async function compressImageWithSharp(buffer, mimetype) {
  if (mimetype === 'image/jpeg') {
    return await sharp(buffer).jpeg({ quality: 50 }).toBuffer();
  } else if (mimetype === 'image/png') {
    return await sharp(buffer).png({ quality: 80 }).toBuffer();
  }
  return buffer;
}

async function compressImageWithImagemin(buffer) {
  return await imagemin.default.buffer(buffer, {
    plugins: [
      imageminMozjpeg.default({ quality: 50 }),
      imageminPngquant.default({ quality: [0.6, 0.8] })
    ]
  });
}


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

  static async insertImage({ image, label }, portfolioId) {
    try {
        const compressedBuffer = await compressImageWithImagemin(image.buffer);
        
        const compressedSize = compressedBuffer.length;

        console.log(`Original size: ${image.buffer.length} bytes`);
        console.log(`Compressed size: ${compressedSize} bytes`);
        console.log(`Compression saved: ${image.buffer.length - compressedSize} bytes`);

        const result = await pool.query(
            `INSERT INTO images (id, portfolio_id, label, serialized, mimetype) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [crypto.randomBytes(8).toString('hex'), portfolioId, label, compressedBuffer, image.mimetype]
        );
        
        return result.rows[0];
    } catch (error) {
        console.log(error);
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
