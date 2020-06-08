"use strict";

const { Post } = require("./../../models");

module.exports.handle = async (event) => {
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