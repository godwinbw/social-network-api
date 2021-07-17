const { Thought } = require("../models");

const notImplemented = {
  message: "route not implemented",
};

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    res.json(notImplemented);
  },

  // get a single thought by _id and populated thought and friend data
  getThoughtById(req, res) {
    res.json(notImplemented);
  },

  // create a new thought (dont' forget to push the created thought _id to the user's thoughts array field)
  createThought(req, res) {
    res.json(notImplemented);
  },

  // put to update a thought by _id
  updateThought(req, res) {
    res.json(notImplemented);
  },

  // delete to remove a thought by _id
  deleteThought(req, res) {
    res.json(notImplemented);
  },

  // post to add a new reaction to a thought
  addReactionToThought(req, res) {
    res.json(notImplemented);
  },

  // delete to remove a reaction from a thought
  deleteReactionFromThought(req, res) {
    res.json(notImplemented);
  },
};

module.exports = thoughtController;
