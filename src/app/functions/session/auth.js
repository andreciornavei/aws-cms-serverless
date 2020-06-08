"use strict";

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("./../../models");

module.exports.handle = async (event, context) => {

  
  const authHeader =
  (event.headers && event.headers.Authorization) || undefined;
  
  
  if (!authHeader) {
    context.end();
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Token not provided",
      }),
    };
  }
  
  try {
    const [, token] = authHeader.split(" ");
    const payload = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      context.end();
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: `The user was not founded for this payload token authorization = ${JSON.stringify(
            payload
          )} at auth middleware`,
        }),
      };
    } else {
      context.auth = user;
      return { statusCode: 201 };
    }
  } catch (err) {
    context.end();
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Invalid token",
      }),
    };
  }
};
