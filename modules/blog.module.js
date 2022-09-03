// Memanggil helper database yang telah dibuat
const mysql = require('../helpers/database');

// Input validation
const Joi = require('joi');

class _blog {
  listBlogPost = async () => {
    try {
      const list = await mysql.query(
        'SELECT user_id, title, post FROM d_blog_post',
        []
      )
      return {
        status: true,
        data: list
      }
    } catch (err) {
      console.error('listBlogPost error :',err);
      return {
        status: false,
        err
      }      
    }
  }
}

module.exports = new _blog();