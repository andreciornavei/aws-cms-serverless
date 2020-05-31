"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const { Post } = require("./../models");

module.exports.index = async (event) => {
  const posts = await Post.findAll({ where: { deleted: false } });

  if (!posts) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Was not possible to lists posts",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};

module.exports.show = async (event) => {
  const postId =
    (event.queryStringParameters && event.queryStringParameters.id) || null;

  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The post with id ${postId} was not found`,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(post),
  };
};

module.exports.store = async (event, { auth }) => {
  const body = JSON.parse(event.body);
  const messageData = {
    title: body.title,
    subtitle: body.subtitle,
    content: body.content,
    img_url: body.img_url || "",
    author: auth.dataValues.username,
  };

  try {
    await sqs.sendMessage({
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

module.exports.update = async (event, { auth }) => {
  const body = JSON.parse(event.body);

  const post = await Post.findOne({ where: { id: body.id } });
  if (!post) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The post with id ${body.id} was not found`,
      }),
    };
  }

  post.title = body.title || post.title;
  post.subtitle = body.subtitle || post.subtitle;
  post.content = body.content || post.content;
  post.img_url = body.img_url || post.img_url;
  await post.save();

  return {
    statusCode: 200,
    body: JSON.stringify(post),
  };
};

module.exports.destroy = async (event) => {
  const body = JSON.parse(event.body);
  const post = await Post.findOne({ where: { id: body.id } });
  if (!post) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The post with id ${body.id} was not found`,
      }),
    };
  }
  post.deleted = true;
  await post.save();

  return {
    statusCode: 200,
  };
};
