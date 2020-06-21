"use strict";

const { Post } = require("./../../../models");
const Exception = require("./../../../utils/exception");

module.exports.handle = async (event) => {
  try {
    //get id from query string params 
    const postId = event.queryStringParameters.id;
    //Select all posts that is not marked as deleted
    const post = await Post.findOne({ 
      attributes: [
      "id", "title", "subtitle", "content", 
      "img_url",  "author", "created_at"
      ], 
      where: { id: postId, deleted: false }
    });
    //return selected posts to client
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  } catch (error) {
    //Execute Exception function to return 
    //the apropriated error message
    return Exception(error);
  }
};
