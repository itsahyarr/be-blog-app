const mysql = require('../helpers/database');
const Joi = require('joi');
const bcrypt = require('bcrypt');

class _user {
  listUser = async () => {
    try {
      const list = await mysql.query(
        'SELECT * FROM auth_user',
        []
      )
      return {
        status: true,
        data: list
      }
    } catch (err) {
      console.error('listUser user module error :',err);
      return {
        status: false,
        err
      }
    }
  }
  addUser = async (body) => {
    try {
      const schema = Joi.object({
        nama: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
      })
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)
        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }
      body.password = bcrypt.hashSync(body.password, 10)
      const add = await mysql.query(
        'INSERT INTO auth_user (nama, username, password) VALUES (?, ?, ?)',
        [body.nama, body.username, body.password]
      )
      return {
        status: true,
        data: add
      }
    } catch (error) {
      console.error('addUser user module error : ',err);
      return {
        status: false,
        err
      }
    }
  }
}

module.exports = new _user();