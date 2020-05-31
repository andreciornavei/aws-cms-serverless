'use strict';
    
const src_app_controllers_session = require('../src/app/controllers/session');
const src_app_controllers_users = require('../src/app/controllers/users');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(src_app_controllers_session.auth.bind(src_app_controllers_session)))
    .then(wrappedHandler(src_app_controllers_users.store.bind(src_app_controllers_users)));
};