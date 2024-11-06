const Router = require("express").Router;

const {
  adminLogin,
  getStoriesStats,
} = require("../controllers/adminController");

const router = Router();

router.post("/adminLogin", adminLogin);
router.get("/stories/stats", getStoriesStats);

module.exports = router;
