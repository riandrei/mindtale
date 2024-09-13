const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_KEY);

const verify = async (credential) => {
  console.log(credential);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_OAUTH_KEY,
  });

  return ticket.getPayload();
};

const googleMiddleware = async (req, res, next) => {
  console.log("running");
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: "No credential provided" });
  }

  try {
    const userInfo = await verify(credential);

    res.userInfo = userInfo;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = googleMiddleware;
