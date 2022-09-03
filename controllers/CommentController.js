const { Router } = require('express');
const response = require('../helpers/response');
const m$comment = require('../modules/comment.module');

const CommentController = Router();

/**
 * Add Comment on Blog
 * @param {number} user_id
 * @param {number} blog_post_id
 * @param {string} comment
 */
CommentController.post('/', async (req, res, next) => {
  const add = await m$comment.addComment(req.body);

  response.sendResponse(res, add);
})

module.exports = CommentController;