"use strict";

const yup = require("yup");
const Exception = require("./../../../utils/exception");
const { User } = require("./../../../models");

module.exports.handle = async (event) => {
  try {
    const body = JSON.parse(event.body);

    //Define a schema to validate request body
    const schema = yup.object().shape({
      username: yup.string().required().email(),
      password: yup.string().required(),
      access_group_id: yup.string().required(),
    });

    //check if schema is valid
    await schema.validate(body, { abortEarly: false });

    //create user if is everything ok
    const user = await User.create({
      username: body.username,
      password: body.password,
      access_group_id: body.access_group_id,
    });

    //remove password to return user object
    delete user.dataValues.password;
    delete user.dataValues.password_hash;

    return {
      statusCode: 200,
      body: JSON.stringify(user.dataValues),
    };
  } catch (error) {
    //Execute Exception function to return
    //the apropriated error message
    return Exception(error);
  }
};
