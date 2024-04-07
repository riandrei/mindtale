const jwt = require("jsonwebtoken");

const tokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = tokenMiddleware;
