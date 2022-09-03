const mysql = require('../helpers/database');
const Joi = require('joi');

class _comment {
  addComment = async (body) => {
    try {
      const schema = Joi.object({
        user_id: Joi.number().required(),
        blog_post_id: Joi.number().required(),
        comment: Joi.string().required()
      })

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message);
         return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
         }
      }
      const add = await mysql.query(
        'INSERT INTO d_blog_comment (user_id, blog_post_id, comm) VALUES (?, ?, ?)',
        [body.user_id, body.blog_post_id, body.comment]
      )
      return {
        status: true,
        data: add
      }
    } catch (err) {
      console.error('addComment comment module error :', err);
      return {
        status: false,
        err
      }
    }
  } 
}

module.exports = new _comment();