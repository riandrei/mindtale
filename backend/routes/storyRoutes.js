const Router = require("express").Router;
const router = Router();

const {
  getStories,
  postReview,
  getReviews,
  deleteReview,
  generateStoryCover,
  addStory,
  deleteStory,
  getAllStories
} = require("../controllers/storyController");

const tokenMiddleware = require("../middleware/tokenMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

router.get("/stories", tokenMiddleware, getStories);
router.get("/allStories", getAllStories);
router.post("/stories", multerMiddleware, addStory);
router.get("/stories/:id/review", getReviews);
router.post("/stories/:id/review", tokenMiddleware, postReview);
router.delete("/stories/:id/review", tokenMiddleware, deleteReview);
router.post("/stories/cover", generateStoryCover);
router.delete("/stories/:id", deleteStory);

module.exports = router;
