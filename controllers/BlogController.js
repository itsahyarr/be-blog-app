const { Router } = require('express');
const response = require('../helpers/response');
const blogModules = require('../modules/blog.module');
const userSession = require('../helpers/middleware')
const m$blog = require('../modules/blog.module')

const BlogController = Router();

/**
 * List Blog Post
 */
BlogController.get('/', userSession, async (req, res, next) => {
  const list = await m$blog.listBlogPost(req.query);

  response.sendResponse(res, list);
})

/**
 * Detailed Blog Post
 */
BlogController.get('/detail', userSession, async (req, res, next) => {
  // req.query
  // {{api_root}}/blogs/detail?id=1
  const detail = await m$blog.detailPost(req.query.id)
  response.sendResponse(res, detail)
})

/**
 * Add Article / Blog Post
 * @param {number} user_id
 * @param {string} title
 * @param {string} article
 */
BlogController.post('/', userSession, async (req, res, next) => {
  // req.body req.param req.query
  const add = await m$blog.addArticle(req.body)
  response.sendResponse(res, add)
})

/**
 * Edit Article
 * @param {number} id
 * @param {number} user_id
 * @param {string} title
 * @param {string} article
 */
BlogController.put('/', userSession, async (req, res, next) => {
  const edit = m$blog.editPost(req.body)
  response.sendResponse(res, edit)
})

/**
 * Delete Article
 * @param {number} id
 */
BlogController.delete('/:id', userSession, async (req, res, next) => {
  const del = await m$blog.deletePost(req.params.id)
  response.sendResponse(res, del)
})

module.exports = BlogController;