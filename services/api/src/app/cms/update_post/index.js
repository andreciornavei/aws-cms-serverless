"use strict";

const jwt = require("./../../utils/jwt");
const { Post } = require("./../../models");

module.exports.handler = async (event) => {
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

  const postId = (body && body.id) || undefined;
  if (!postId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `The request must provide a 'id' parameter to update post resources`,
      }),
    };
  }

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