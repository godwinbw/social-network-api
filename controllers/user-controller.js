const { User } = require("../models");

const notImplemented = {
  message: "route not implemented",
};

const userController = {
  // get all users
  getAllUser(req, res) {
    res.json(notImplemented);
  },

  // get a single user by _id and populated thought and friend data
  getUserById(req, res) {
    res.json(notImplemented);
  },

  // post a new user
  createUser(req, res) {
    res.json(notImplemented);
  },

  // put to update a user by _id
  updateUser(req, res) {
    res.json(notImplemented);
  },

  // delete to remove a user by _id
  deleteUser(req, res) {
    res.json(notImplemented);
  },

  // post to add a new friend to a user's friend list
  addFriendToUser(req, res) {
    res.json(notImplemented);
  },

  // delete to remove a friend from a user's friend list
  removeFriendFromUser(req, res) {
    res.json(notImplemented);
  },
};

module.exports = userController;
