const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

//this trick runs only on test and dev mode to send and retrieve sqs messages
if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "dev") {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: "default",
  });
  AWS.config.credentials = credentials;
}

module.exports = new AWS.SQS({ apiVersion: "2012-11-05" });