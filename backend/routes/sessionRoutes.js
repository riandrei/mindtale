const Router = require("express").Router;
const router = Router();

const {
  startSession,
  submitUserChoice,
  getAssesment,
  submitAssesmentScore,
  getTextToSpeech,
  translateText,
} = require("../controllers/sessionControllers");
const { addHistory } = require("../controllers/authController");

const tokenMiddleware = require("../middleware/tokenMiddleware");

router.get("/sessions/:storyId", tokenMiddleware, addHistory, startSession);
router.post("/sessions/:storyId", tokenMiddleware, submitUserChoice);
router.get("/sessions/:storyId/completed", tokenMiddleware, getAssesment);
router.post(
  "/sessions/:storyId/completed",
  tokenMiddleware,
  submitAssesmentScore
);
// router.get("/sessions/:storyId/tts", tokenMiddleware, getTextToSpeech);
router.post("/translatetext", translateText);

module.exports = router;
