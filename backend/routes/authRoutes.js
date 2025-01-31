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
  forgotPassword,
  checkVerificationCode,
  changePassword,
  submitUserData,
  submitUserPreference,
  getWordsStats,
  submitWordInteraction,
  submitWordReadingScore,
  submitComprehensionScore,
  getPHILIRIResults,
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
router.post("/forgot", forgotPassword);
router.post("/checkVerificationCode", checkVerificationCode);
router.post("/changePassword", changePassword);
router.put("/userData", tokenMiddleware, multerMiddleware, submitUserData);
router.put("/userPreference", tokenMiddleware, submitUserPreference);
router.get("/wordStats", tokenMiddleware, getWordsStats);
router.post("/wordInteraction", tokenMiddleware, submitWordInteraction);
router.post("/wordReadingScore", tokenMiddleware, submitWordReadingScore);
router.post("/comprehensionScore", tokenMiddleware, submitComprehensionScore);
router.get("/philIRI", tokenMiddleware, getPHILIRIResults);

module.exports = router;
