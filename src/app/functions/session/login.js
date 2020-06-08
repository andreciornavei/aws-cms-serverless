"use strict";

const { User } = require("./../../models");

module.exports.handle = async (event) => {
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
        message: "username or password invalid",
        token: null,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      token: user.generateToken(),
    }),
  };
};
