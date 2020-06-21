"use strict";

const { Post } = require("./../../../models");
const Exception = require("./../../../utils/exception");
const ApiError = require("./../../../utils/api_error");

module.exports.handle = async (event) => {
  try {
    
    //parse body to access object data
    const body = JSON.parse(event.body);
    
    //find the post by body.id
    const post = await Post.findOne({ where: { id: body.id, deleted: false } });
    
    //Return a error if post does not exists
    if (!post) {
      throw new ApiError(
        404,
        "Post not found"
      )
    }

    //Mark post as deleted if it exists
    post.deleted = true;
    await post.save();

    //return success message
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Post deleted"})
    }
    
  } catch (error) {
    //Execute Exception function to return 
    //the apropriated error message
    return Exception(error);
  }
};
