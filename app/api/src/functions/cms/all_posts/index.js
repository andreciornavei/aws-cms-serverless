"use strict";

const { sequelize, Post } = require("./../../../models");

module.exports.handle = async () => {
  try {
    //Select all posts that is not marked as deleted
    const posts = await Post.findAll({ 
      attributes: [
      "id", "title", "subtitle", "content", 
      "img_url",  "author", "created_at"
      ], 
      where: { deleted: false }
    });
    //return selected posts to client
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    //if happen some error, print it on cloudwatch to debug
    console.log(error);
    //return error message to client
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "We had some problems with this request :-(",
      }),
    };
  }
};
