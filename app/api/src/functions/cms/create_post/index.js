"use strict";

const yup = require("yup");
const AWS = require("aws-sdk");
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
      author: event.requestContext.authorizer,
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
    if (error instanceof yup.ValidationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Check the provided input values",
          errors: error.errors,
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
