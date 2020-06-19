"use strict";

const yup = require("yup");
const sequelize = require("sequelize")
const { User } = require("./../../../models");

module.exports.handle = async (event) => {
  try {
    const body = JSON.parse(event.body);

    //Define a schema to validate request body
    const schema = yup.object().shape({
      username: yup.string().required(),
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
    if (error instanceof yup.ValidationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Check the provided input values",
          errors: error.errors,
        }),
      };
    } else if(error instanceof sequelize.ValidationError){
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Check the provided input values",
          errors: error.errors.map(item => item.message),
        }),
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "We had some problems with this request :-(",
        }),
      };
    }
  }
};
