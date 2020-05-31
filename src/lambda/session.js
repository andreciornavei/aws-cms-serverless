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
      statusCode: 403,
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
    const payload = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {

      const users = await User.findAll();
      console.log("ALL USERS =", users)

      context.end();
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: `The user was not founded for this payload token authorization = ${JSON.stringify(payload)} at auth middleware`,
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
