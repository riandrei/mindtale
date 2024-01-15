const Router = require("express").Router;
const sessionControllers = require("../controllers/sessionControllers");

const router = Router();

console.log("sessionRoutes.js");

router.get("/gameState", sessionControllers.getGameState);
// router.post("/userDecision", sessionControllers.postUserDecision);

module.exports = router;
