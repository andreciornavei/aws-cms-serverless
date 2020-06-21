"use strict";

const { Post } = require("./../../../models");

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
