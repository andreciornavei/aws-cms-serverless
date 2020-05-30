const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define('User', User, {
    username: factory.chance('email'),
    password: factory.chance('word', { length: 5 }),
    access_group_id: "123",
})

module.exports = factory