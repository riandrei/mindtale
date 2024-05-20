const Router = require("express").Router;

const {
  signUp,
  signIn,
  verify,
  getUser,
  toggleUserBookmark,
  addVisited,
  getUsers,
  updateUser,
  addFriend,
  acceptFriendRequest,
  declineFriendRequest,
} = require("../controllers/authController");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

const router = Router();

router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/verify", verify);
router.get("/user", tokenMiddleware, getUser);
router.post("/bookmark/:storyId", tokenMiddleware, toggleUserBookmark);
router.post("/visited/:storyId", tokenMiddleware, addVisited);
router.get("/users", tokenMiddleware, getUsers);
router.put("/user", tokenMiddleware, multerMiddleware, updateUser);
router.post("/friend/:userId", tokenMiddleware, addFriend);
router.post("/accept/:friendId", tokenMiddleware, acceptFriendRequest);
router.post("/decline/:friendId", tokenMiddleware, declineFriendRequest);

module.exports = router;
