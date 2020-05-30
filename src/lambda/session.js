"use strict";

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { User } = require("./../app/models");
module.exports.login = async (event) => {
  let body = {};
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body);
  }

  const { username, password } = body;

  const user = await User.findOne({
    where: { username: username },
  });

  if (!user || !(await user.checkPassword(password))) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Username or password invalid",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        user: user,
        token: user.generateToken(),
      },
      null,
      2
    ),
  };
};

module.exports.auth = async (event, context) => {
  const authHeader =
    (event.headers && event.headers.Authorization) || undefined;

  if (!authHeader) {
    context.end();
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Token not provided",
        },
        null,
        2
      ),
    };
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    return { statusCode: 200 };
  } catch (err) {
    console.log(err);
    context.end();
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Invalid token",
        },
        null,
        2
      ),
    };
  }
};
