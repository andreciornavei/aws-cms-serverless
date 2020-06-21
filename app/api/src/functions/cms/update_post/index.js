"use strict";

const yup = require("yup");
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

    //Define a schema to validate request body
    const schema = yup.object().shape({
      title: yup.string(),
      subtitle: yup.string(),
      content: yup.string(),
      img_url: yup.string(),
    });

    //check if schema is valid
    await schema.validate(body, { abortEarly: false });

    //Update post data if it was provided on body
    post.title = body.title || post.title;
    post.subtitle = body.subtitle || post.subtitle;
    post.content = body.content || post.content;
    post.img_url = body.img_url || post.img_url;
    await post.save();

    //return success message
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Post updated"})
    }

  } catch (error) {
    //Execute Exception function to return
    //the apropriated error message
    return Exception(error);
  }
};
