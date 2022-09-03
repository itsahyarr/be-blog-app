const AuthController = require('./controllers/AuthController');
const BlogController = require('./controllers/BlogController');
const CommentController = require('./controllers/CommentController');
const UserController = require('./controllers/UserController');

const _routes = [
  ['/login', AuthController],
  ['/blogs', BlogController],
  ['/user', UserController],
  ['/comment', CommentController]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [ url, controller ] = route;
    app.use(`/api${url}`, controller);
  });
}

module.exports = routes;