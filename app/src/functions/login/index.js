"use strict";

const { User } = require("./../../models");
const Exception = require("./../../utils/exception");
const ApiError = require("./../../utils/api_error");

module.exports.handle = async (event) => {
  try {
    //Parse the content body of the request to get user inputs
    const body = JSON.parse(event.body);

    //Verify if body contains username and password to attempt login
    if (
      !body ||
      !body.hasOwnProperty("username") ||
      !body.hasOwnProperty("password")
    ) {
      throw new ApiError(
        400,
        `You must provide username and password credentials`
      );
    }

    //Abstract username and password from the body
    const { username, password } = body;

    //Try to find user by username on database
    const user = await User.findOne({
      where: { username: username },
    });

    //Check if user is undefined or password is correct
    //If true, return authorization failed
    if (!user || !(await user.checkPassword(password))) {
      throw new ApiError(401, `username or password invalid`);
    }

    //If code got here, the provided user is authentic
    //and the token can be generated
    return {
      statusCode: 200,
      body: JSON.stringify({
        jwt: user.generateToken(),
      }),
    };
  } catch (error) {
    //Execute Exception function to return
    //the apropriated error message
    return Exception(error);
  }
};
