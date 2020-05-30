"use strict";

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
        token: user.generateToken()
      },
      null,
      2
    ),
  };
};
