const { Router } = require('express');
const response = require('../helpers/response');
const blogModules = require('../modules/blog.module');
const m$blog = require('../modules/blog.module')

const BlogController = Router();

/**
 * List Blog Post
 */
BlogController.get('/', async (req, res, next) => {
  const list = await m$blog.listBlogPost();

  response.sendResponse(res, list);
})

BlogController.post('/',)

module.exports = BlogController;