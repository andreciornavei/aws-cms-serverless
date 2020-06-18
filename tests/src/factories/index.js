const { factory } = require("factory-girl");
const { User, Post } = require("../src/app/models");

factory.define("User", User, {
  username: factory.chance("email"),
  password: factory.chance("word", { length: 5 }),
  access_group_id: "123",
});

factory.define("Post", Post, {
  title: factory.chance("sentence", { words: 3 }),
  subtitle: factory.chance("sentence", { words: 6 }),
  content: factory.chance("paragraph", { sentences: 4 }),
  img_url: factory.chance("url", { extensions: ["gif", "jpg", "png"] }),
  author: 'unknown',
  deleted: false,
});

module.exports = factory;
