// Memanggil helper database yang telah dibuat
const mysql = require('../helpers/database');

// Input validation
const Joi = require('joi');

class _blog {
  listBlogPost = async (body = {}) => {
    try {
      const schema = Joi.object({
        user_id: Joi.number()
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
      const sql = {
        query: `
        SELECT
          bp.id,
          bp.title,
          bp.post,
          bp.created_at,
          bp.updated_at,
          bp.user_id,
          au.username,
          au.nama,
          dbc.id comment_id,
          dbc.user_id comment_user_id,
          auc.username comment_username,
          dbc.comm
        FROM d_blog_post bp
        JOIN auth_user au ON au.id = bp.user_id
        LEFT JOIN d_blog_comment dbc ON dbc.blog_post_id = bp.id
        LEFT JOIN auth_user auc ON auc.id = dbc.user_id
        WHERE 1`,
        params: []
      }
      if (body.user_id) {
        sql.query += ' AND bp.user_id = ?'
        sql.params.push(body.user_id)
      }

      const list = await mysql.query(sql.query, sql.params);

      const data = []

      for (const value of list) {
        const postIndex = data.findIndex(blogpost => blogpost.id === value.id)
        if (postIndex === -1) {
          data.push({
            id: value.id,
            title: value.title,
            article: value.post,
            created_at: value.created_at,
            updated_at: value.updated_at,
            user: {
              id: value.user_id,
              username: value.username
            },
            comment: value.comment_id ? [{
              id: value.comment_id,
              comment: value.comm,
              user: {
                id: value.comment_user_id,
                username: value.comment_username
              }
            }] : []
          })
        } else {
          if (value.comment_id) {
            data[postIndex].comment.push({
              id: value.comment_id,
              comment: value.comm,
              user: {
                id: value.comment_user_id,
                username: value.comment_username
              }
            })
          }
        }
      }

      return {
        status: true,
        data
      }
    } catch (err) {
      console.error('listBlogPost module error :', err);
      return {
        status: false,
        err
      }      
    }
  }

  // Blog Post (Articles)
  detailPost = async (id) => {
    try {
      const schema = Joi.number().required()
      const validation = schema.validate(id)

      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)
        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }
      const detailPost = await mysql.query(
        `SELECT
          bp.id,
          bp.title,
          bp.post,
          bp.created_at,
          bp.updated_at,
          bp.user_id,
          au.username
        FROM d_blog_post bp
        JOIN auth_user au ON au.id = bp.user_id
        WHERE bp.id = ?`,
        [id]
      )
      if (detailPost <= 0) {
        return {
          status: false,
          code: 404,
          error: 'Sorry, article not found'
        }
      }
      const data = []
      for (const value of detailPost) {
        data.push({
          id: value.id,
          title: value.title,
          article: value.post,
          created_at: value.created_at,
          updated_at: value.updated_at,
          user: {
            id: value.user_id,
            username: value.username
          }
        })
      }
      return {
        status: true,
        data: data[0]
      }
    } catch (err) {
      console.error('detailPost module error : ', err)
      return {
        status: false,
        error: err
      }
    }
  }
  // Create article
  addArticle = async (body) => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        title: Joi.string().required(),
        article: Joi.string()
      })
      const validation = schema.validate(body)
      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)
        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }
      const add = await mysql.query(
        'INSERT INTO d_blog_post (user_id, title, post) VALUES (?, ?, ?)',
        [body.username, body.title, body.article]
      )
      return {
        status: true,
        data: add
      }
    } catch (err) {
      console.error('addArticle module error :', err)
      return {
        status: false,
        err
      }
    }
  }

  // Update post/article
  editPost = async (body) => {
    try {
      const schema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string(),
        user_id: Joi.string(),
        article: Joi.string()
      })
      const validation = schema.validate(body)
      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)
        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }
      const edit = await mysql.query(
        'UPDATE d_blog_post SET title = ?, post = ?, user_id = ? WHERE id = ?',
        [body.title, body.article, body.user_id, body.id]
      )
      return {
        status: true,
        data: edit
      }
    } catch (err) {
      console.error('editPost module error : ', err)
      return {
        status: false, 
        err
      }
    }
  }

  // Delete article/post
  deletePost = async (id) => {
    try {
      const body = { id }
      const schema = Joi.object({
        id: Joi.number().required()
      })
      const validation = schema.validate(body)
      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)
        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ') 
        }
      }
      const del = await mysql.query(
        'DELETE FROM d_blog_post WHERE id = ?',
        [id]
      )
      return {
        status: true,
        data: del
      }
    } catch (err) {
      console.error('deletePost module error : ', err)
      return {
        status: false,
        err
      }
    }
  }
}

module.exports = new _blog();