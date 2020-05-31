"use strict";

const { User } = require("./../models");

module.exports.store = async (event) => {
  const body = JSON.parse(event.body);

  const unique = await User.findOne({ where: { username: body.username } });
  if (unique) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The account with username "${body.username}" already exists`,
      }),
    };
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    access_group_id: body.access_group_id,
  });
  if (!user) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Was not possible to create a new user",
      }),
    };
  }

  const { password, password_hash, ...outputuser } = user.dataValues

  return {
    statusCode: 200,
    body: JSON.stringify(outputuser),
  };
};
