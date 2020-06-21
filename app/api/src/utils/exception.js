const yup = require("yup");
const sequelize = require("sequelize")
const ApiError = require("./api_error");

const Exception = (error) => {
  if (error instanceof ApiError) {
    return {
      statusCode: error.getCode(),
      body: JSON.stringify({
        message: error.getMessage(),
      }),
    };
  } else if (error instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Check the provided input values",
        errors: error.errors,
      }),
    };
  } else if (error instanceof sequelize.ValidationError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Check the provided input values",
        errors: error.errors.map((item) => item.message),
      }),
    };
  }
  console.log(error);
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "We had some problems with this request :-(",
    }),
  };
};


module.exports = Exception