const { User } = require("../models");

const notImplemented = {
  message: "route not implemented",
};

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a single user by _id and populated thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(400).json(err));
  },

  // put to update a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete to remove a user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
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
