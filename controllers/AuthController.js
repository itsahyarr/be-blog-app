const { Router } = require('express');
const response = require('../helpers/response');
const m$auth = require('../modules/auth.module');

const AuthController = Router();

/**
 * Login User
 * @param {string} username
 * @param {string} password
 */
AuthController.post('/', async (req, res, next) => {
  const login = await m$auth.login(req.body);

  response.sendResponse(res, login);
})

module.exports = AuthController;