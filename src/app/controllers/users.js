"use strict";

const { User } = require("./../models");

module.exports.store = async (event, { auth }) => {
  const body = JSON.parse(event.body);

  //check permission with ID 1 for "User Manager"
  if(!auth.dataValues.access_group_id.includes("1")){
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "You have no user permission to manage this user resource"
      })
    }
  }
  
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
