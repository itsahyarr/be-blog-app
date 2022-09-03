const express = require('express');
const app = express();
const response = require('./helpers/response');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 5001

// Handle CORS
app.use(cors());

// Serialize and Deserialize Input
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Welcome API
app.get('/', async (req, res, next) => {
  res.status(200).send({
    message: 'Welcome to Backend Blog API'
  })
})

// Routes
routes(app);

// Error Handler
app.use(response.errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})