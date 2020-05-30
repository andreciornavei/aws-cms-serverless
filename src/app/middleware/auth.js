const jwt = require("jsonwebtoken");
const { promifisy } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader) {
    return res.status(500).json({ message: "Token not provided " });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promifisy(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(500).json({ message: "Invalid token" });
  }
  
};
