"use strict";

const jwt = require("./../../utils/jwt");
const sqs = require("./../../utils/sqs");

module.exports.handle = async (event) => {

  const payload = await jwt(event);

  //check permission with ID 2 or 3 for "Content Manger and/or Content Curator"
  if (
    !payload.acl.includes("2") &&
    !payload.acl.includes("3")
  ) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "You have no user permission to manage this post resource",
      }),
    };
  }

  const body = JSON.parse(event.body);

  const messageData = {
    title: body.title,
    subtitle: body.subtitle,
    content: body.content,
    img_url: body.img_url || "",
    author: payload.username,
  };

  try {
    const sendsqs = await sqs.sendMessage({
      MessageBody: JSON.stringify(messageData),
      QueueUrl: process.env.SQS_URL,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message was added to queue",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Was not possible to add this message to queue",
      }),
    };
  }
};
