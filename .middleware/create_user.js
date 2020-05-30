'use strict';
    
const src_lambda_session = require('../src/lambda/session');
const src_lambda_users = require('../src/lambda/users');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(src_lambda_session.auth.bind(src_lambda_session)))
    .then(wrappedHandler(src_lambda_users.store.bind(src_lambda_users)));
};