const { User, Thought } = require("../models");

const notImplemented = {
  message: "route not implemented",
};

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
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

  // delete all thoughts
  deleteAllThoughts(req, res) {
    Thought.deleteMany({})
      .then((deletedThoughts) => {
        res.json(deletedThoughts);
      })
      .catch((err) => res.status(400).json(err));
  },

  // get a single thought by _id and populated thought and friend data
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new thought (dont' forget to push the created thought _id to the user's thoughts array field)
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then(({ _id }) => {
        console.log("created thought id -> ", _id);
        console.log("now add to user id -> ", req.body.userId);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        ).then((dbData) => {
          if (!dbData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbData);
        });
      })
      .catch((err) => res.json(err));
  },

  // put to update a thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete to remove a thought by _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { username: params.username },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  // post to add a new reaction to a thought
  addReactionToThought(req, res) {
    console.log("add reaction to thought!");
    console.log("  thought id -> ", req.params.id);
    console.log("  reaction body -> ", req.body);

    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        console.log("dbData -> ", dbData);
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  // delete to remove a reaction from a thought
  deleteReactionFromThought(req, res) {
    console.log("delete reaction from thought!");
    console.log("  thought id -> ", req.params.id);
    console.log("  reaction id -> ", req.body.reactionId);
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
