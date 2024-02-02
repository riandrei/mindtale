const Router = require("express").Router;

const { signUp } = require("../controllers/authController");

const router = Router();

router.post("/login", (req, res) => {
  console.log(req.body);
});
router.post("/signup", signUp);

module.exports = router;
