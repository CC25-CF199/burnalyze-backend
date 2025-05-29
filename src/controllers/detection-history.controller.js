const user_histories = async (req, res, next) => {
  res.send(req.params.id);
};

module.exports = { user_histories };
