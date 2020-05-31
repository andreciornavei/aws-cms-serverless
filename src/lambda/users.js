"use strict";

module.exports.store = async (event) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "CREATE USER",
    }),
  };
};
