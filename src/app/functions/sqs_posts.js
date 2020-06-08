"use strict";

const sqs = require('../utils/sqs')
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
