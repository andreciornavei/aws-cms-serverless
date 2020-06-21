"use strict";

const yup = require("yup");
const AWS = require("aws-sdk");
const Exception = require("./../../../utils/exception");

AWS.config.update({ region: process.env.AWS_REGION, });
const SQS = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports.handle = async (event) => {
  try {

    const body = JSON.parse(event.body);

    //Define a schema to validate request body
    const schema = yup.object().shape({
      title: yup.string().required(),
      subtitle: yup.string().required(),
      content: yup.string().required(),
      img_url: yup.string().required(),
    });

    //check if schema is valid
    await schema.validate(body, { abortEarly: false });

    const messageData = {
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      img_url: body.img_url || "",
      author: event.requestContext.authorizer.username,
    };

    await SQS.sendMessage({
      MessageBody: JSON.stringify(messageData),
      QueueUrl: process.env.SQS_CREATE_POST_URL,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "The post was created with success and will be available soon.",
      }),
    };

  } catch (error) {
    //Execute Exception function to return
    //the apropriated error message
    return Exception(error);
  }
};
