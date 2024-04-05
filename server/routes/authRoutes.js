const Router = require("express").Router;

const { signUp, signIn } = require("../controllers/authController");

const router = Router();

router.post("/login", signIn);
router.post("/signup", signUp);

module.exports = router;
