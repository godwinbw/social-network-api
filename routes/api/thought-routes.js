const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReactionToThought,
  deleteReactionFromThought,
} = require("../../controllers/thought-controller");

// setup GET and POST at api/thoughts
// api/thoughts
router.route("/").get(getAllThought).post(createThought);

// setup GET one, PUT, and DELETE
// api/thoughts/:id

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// add and remote a friend
// api/thoughts/:id/reactions
router
  .route("/:id/reactions")
  .post(addReactionToThought)
  .delete(deleteReactionFromThought);

module.exports = router;
