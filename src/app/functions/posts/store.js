"use strict";

const sqs = require("./../../utils/sqs");

module.exports.handle = async (event, { auth }) => {
  //check permission with ID 2 or 3 for "Content Manger and/or Content Curator"
  if (
    !auth.dataValues.access_group_id.includes("2") &&
    !auth.dataValues.access_group_id.includes("3")
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
    author: auth.dataValues.username,
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
