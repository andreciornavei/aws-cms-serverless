"use strict";

module.exports.handle = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Serverless is running!",
      input: event,
    }),
  };
};
