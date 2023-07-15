const pool = require("../config/database.js")
const {
    InvalidCredentialsError,
    NotFoundError,
    InternalServerError,
    FieldValidationError,
} = require("../utilities/error.js")
const crypto = require("crypto")

class Template {

    //fetch by Id
    static async fetchById(id) {
        try {
            const result = await pool.query(
                `SELECT * FROM templates WHERE template_id=$1`,
                [id]
            );
            if (result.rows.length === 0) {
                throw error;
            }
            return result.rows[0];
        } catch (error) {
            throw new NotFoundError("Not Found");
        }
    }

    //fetch by the k most liked templates
    static async fetchKMostLikedTemplates(k) {
        try {
            const result = await pool.query(
                `SELECT * FROM templates
             ORDER BY likes DESC
             LIMIT $1`,
                [k]
            );
            if (result.rows.length === 0) {
                throw error;
            }
            return result.rows;
        } catch (error) {
            throw new NotFoundError("No templates found");
        }
    }

    static async insertTemplate(code, likes) {
        try {
          // Check code is a string
          if (typeof code !== "string") {
            throw error;
          }
          // Check likes is a number
          if (typeof likes !== "number") {
            throw error;
          }
          const result = await pool.query(
            `INSERT INTO templates(template_id, code, likes) VALUES($1,$2,$3) RETURNING likes`,
            [
              crypto.randomBytes(8).toString('hex'),
              code,
              likes
            ]
          );
          return result.rows[0];
        } catch (error) {
          throw new InternalServerError("Error Creating template");
        }
      }
      

    //Delete a template
    static async deleteTemplate(id) {
        try {
            await pool.query(`DELETE FROM templates WHERE template_id=$1`, [id])
        } catch (error) {
            throw new InternalServerError("Error Deleting Template")
        }
    }

    //Update the likes of the template
    static async updateTemplateLikes(id, likes) {
        try {
            const result = await pool.query(
                `UPDATE templates SET likes=$1 WHERE template_id=$2 RETURNING likes`,
                [likes, id]
            );
            if (result.rows.length === 0) {
                //template with the given id was not found.
                throw error;
            }
            // Return the updated template
            return result.rows[0];
        } catch (error) {
            throw new InternalServerError("Error Updating Template Likes");
        }
    }

}

module.exports = Template;