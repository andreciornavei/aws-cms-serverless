"use strict";

const { Post } = require("./../../models");

module.exports.handler = async () => {
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
