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
}

module.exports = new _response();