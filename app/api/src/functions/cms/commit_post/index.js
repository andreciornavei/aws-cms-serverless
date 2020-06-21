"use strict";

const { sequelize, Post } = require("./../../../models");

module.exports.handle = async (event) => {
  //Open sequelize transaction to execute all sqs messegen at once
  const trx = await sequelize.transaction();
  try {
    //Iterate all sqs messeages
    for (const record of event.Records) {
      //Parse the sqs message to JSON object
      const message = JSON.parse(record.body);
      //Create the post as a transaction (in memory)
      await Post.create({
        title: message.title,
        subtitle: message.subtitle,
        content: message.content,
        author: message.author,
        img_url: message.img_url || "",
      }, { transaction: trx });
    }
    //If everything is ok, commit all creations
    await trx.commit();
    //Return 2xx to SQS remove messages from queue
    return {
      statusCode: 200,
    }
  } catch (error) {
    //Dispose error on watchlogs
    console.log(error);
    //Cancell all post created until the error moment
    await trx.rollback();
    //Return 5xx to SQS give back the message to queue
    return {
      statusCode: 500,
    };
  }
};
