"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "dev") {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: "default",
  });
  AWS.config.credentials = credentials;
}

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const { Post } = require("./../models");

module.exports.store = async (event) => {
  const result = sqs.receiveMessage({
    QueueUrl: process.env.SQS_URL,
  });

  if (!result || !result.Messages || results.Messages.length == 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "No messages to proccess",
      }),
    };
  } else {
    const body = JSON.parse(results.Messages[0].Body);

    const post = await Post.create({
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      author: body.author,
      img_url: body.img_url || "",
    });

    if (!post) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Was not possible to create a new post",
        }),
      };
    } else {
      /*
      sqs.deleteMessage({
        QueueUrl: process.env.SQS_URL,
        ReceiptHandle: results.Messages[0].ReceiptHandle
      });
      */

      return {
        statusCode: 200,
        body: JSON.stringify(post),
      };
    }
  }
};
