const Router = require("express").Router;

const {
  signUp,
  signIn,
  verify,
  getUser,
} = require("../controllers/authController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

const router = Router();

router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/verify", verify);
router.get("/user", tokenMiddleware, getUser);

module.exports = router;
