const Router = require("express").Router;
const router = Router();

const {
  startSession,
  submitUserChoice,
  getAssesment,
} = require("../controllers/sessionControllers");
const { addHistory } = require("../controllers/authController");

const tokenMiddleware = require("../middleware/tokenMiddleware");

router.get("/sessions/:storyId", tokenMiddleware, addHistory, startSession);
router.post("/sessions/:storyId", tokenMiddleware, submitUserChoice);
router.get("/sessions/:storyId/completed", tokenMiddleware, getAssesment);

// router.get("/gameState", sessionControllers.getGameState);
// router.post("/userDecision", sessionControllers.postUserDecision);

module.exports = router;
