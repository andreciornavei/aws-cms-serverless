"use strict";

const { Post } = require("./../../../models");
const Exception = require("./../../../utils/exception");

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
    //Execute Exception function to return
    //the apropriated error message
    return Exception(error);
  }
};
