"use strict";

const jwt = require("./../../utils/jwt");

module.exports.handle = async (event, context) => {
  const payload = await jwt(event);

  if (!payload) {
    context.end();
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Token invalid or not provided",
      }),
    };
  }

  return { statusCode: 200 };
};
