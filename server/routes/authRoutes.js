const Router = require("express").Router;

const {
  signUp,
  signIn,
  signUpWithGoogle,
  signInWithGoogle,
  verify,
  getUser,
  toggleUserBookmark,
  addVisited,
  getUsers,
  updateUser,
  addFriend,
  acceptFriendRequest,
  declineFriendRequest,
  submitCompletedStory,
  getRanking,
} = require("../controllers/authController");

const tokenMiddleware = require("../middleware/tokenMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");
const googleMiddleware = require("../middleware/googleMiddleware");

const router = Router();

router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/login/google", googleMiddleware, signInWithGoogle);
router.post("/signUp/google", googleMiddleware, signUpWithGoogle);
router.post("/verify", verify);
router.get("/user", tokenMiddleware, getUser);
router.post("/bookmark/:storyId", tokenMiddleware, toggleUserBookmark);
router.post("/visited/:storyId", tokenMiddleware, addVisited);
router.get("/users", tokenMiddleware, getUsers);
router.put("/user", tokenMiddleware, multerMiddleware, updateUser);
router.post("/friend/:userId", tokenMiddleware, addFriend);
router.post("/accept/:friendId", tokenMiddleware, acceptFriendRequest);
router.post("/decline/:friendId", tokenMiddleware, declineFriendRequest);
router.post("/complete/:storyId", tokenMiddleware, submitCompletedStory);
router.get("/ranking", getRanking);

module.exports = router;
