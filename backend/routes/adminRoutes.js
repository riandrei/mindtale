const Router = require("express").Router;

const {
  adminLogin,
  getStoriesStats,
  addAdmin,
  schoolAdminLogin, 
  getAllowedStories,
  approveStory,
  rejectStory
} = require("../controllers/adminController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

const router = Router();

router.post("/adminLogin", adminLogin);
router.get("/stories/stats", getStoriesStats);
router.post("/admin", addAdmin);
router.post("/schoolAdminLogin", schoolAdminLogin)
router.get("/allowedStories", tokenMiddleware, getAllowedStories)
router.post("/approveStory/:storyId", tokenMiddleware, approveStory)
router.post("/rejectStory/:storyId", tokenMiddleware, rejectStory)

module.exports = router;
