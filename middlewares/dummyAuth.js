const mongoose = require('mongoose');

const dummyAuth = (req, res, next) => {
  // Create a valid ObjectId string (24 hex characters)
  // You can use any valid ObjectId here. For example:
  req.user = { id: new mongoose.Types.ObjectId("62a91f3b8e22b3a1f0d6e7b4"), role: 'user' };
  next();
};

module.exports = dummyAuth;
