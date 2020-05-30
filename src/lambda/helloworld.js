'use strict';

module.exports.handle = async event => {

  const { User } = require('./../app/models')
  
  User.create({
    username: 'andreciornavei',
    password: '123456789',
    access_group_id: '1,2,3,4'
  })
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
