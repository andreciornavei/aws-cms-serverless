//This function should handle header jwt token and return its data if valid
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyToken = promisify(jwt.verify);

module.exports = async (event) => {
  try {
    const authHeader = (event.headers && event.headers.Authorization) || undefined;
    if (!authHeader) {
      throw "Auth header undefined";
    }
    const [, token] = authHeader.split(" ");
    const payload = await verifyToken(token, process.env.APP_SECRET);
    return payload;
  } catch (error) {
    console.log("AUTH ERROR >>>>")
    console.log(error)
    console.log("AUTH ERROR <<<<")
    return undefined;
  }
};
