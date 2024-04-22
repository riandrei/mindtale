const Router = require("express").Router;
const router = Router();

const { startSession } = require("../controllers/sessionControllers");
const tokenMiddleware = require("../middleware/tokenMiddleware");

router.get("/sessions/:storyId", tokenMiddleware, startSession);

// router.get("/gameState", sessionControllers.getGameState);
// router.post("/userDecision", sessionControllers.postUserDecision);

module.exports = router;
