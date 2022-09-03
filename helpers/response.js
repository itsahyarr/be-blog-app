class _response {
  sendResponse = (res, data) => {
    try {
      if (data.code) {
        res.status(data.code);

        delete data.code;

        res.send(data);
        return true;
      }
      res.status(data && data.status ? 200 : 500).send(data);
      return true;
    } catch (err) {
      console.error('sendResponse error :',err);
      res.status(400).send({
        status: false,
        err
      });
      return false;
    }
  }

  errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      // Error jwt
      return res.status(401).send({
        status: false,
        error: 'Invalid Token'
      })
    }
    // Default error handling
    return res.status(500).send({
      status: false,
      error: err.message
    })
  }
}

module.exports = new _response();