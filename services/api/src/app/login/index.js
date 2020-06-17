"use strict";

const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
});

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `The user is trying to login with body content: ${JSON.stringify(body)}`,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocorreu um erro na requisição",
      }),
    };
  }
};

// const { User } = require("./../../models");

// module.exports.handle = async (event) => {
//   let body = {};
//   if (event.body !== null && event.body !== undefined) {
//     body = JSON.parse(event.body);
//   }

//   const { username, password } = body;

//   const user = await User.findOne({
//     where: { username: username },
//   });

//   if (!user || !(await user.checkPassword(password))) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "username or password invalid",
//         token: null,
//       }),
//     };
//   }

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       token: user.generateToken(),
//     }),
//   };
// };
