"use strict";

//const { User } = require("./../app/models");
module.exports.index = async (event) => {

  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Listing all users",
      },
      null,
      2
    ),
  };
};

module.exports.store = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Creating user",
      },
      null,
      2
    ),
  };
};
