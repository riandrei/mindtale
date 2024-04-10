const Router = require("express").Router;
const router = Router();

const {
  getStories,
  postReview,
  getReviews,
  deleteReview,
} = require("../controllers/storyController");

const tokenMiddleware = require("../middleware/tokenMiddleware");

router.get("/stories", getStories);
router.get("/stories/:id/review", getReviews);
router.post("/stories/:id/review", tokenMiddleware, postReview);
router.delete("/stories/:id/review", tokenMiddleware, deleteReview);

module.exports = router;
