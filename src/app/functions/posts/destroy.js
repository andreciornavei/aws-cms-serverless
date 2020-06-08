"use strict";

const jwt = require("./../../utils/jwt");
const { Post } = require("./../../models");

module.exports.handle = async (event) => {
  //check permission with ID 2 for "Content Manger"
  const payload = await jwt(event);
  if (!payload.acl.includes("2")) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "You have no user permission to manage this post resource",
      }),
    };
  }

  const body = JSON.parse(event.body);

  const postId = (body && body.id) || undefined;
  if (!postId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The request must provide a 'id' parameter to delete post resources`,
      }),
    };
  }

  const post = await Post.findOne({ where: { id: body.id, deleted: false } });
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
