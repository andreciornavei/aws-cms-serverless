"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("admin", 8);
    return queryInterface.bulkInsert("users", [{
      username: "admin",
      password_hash: `${passwordHash}`,
      access_group_id: "123",
      created_at: new Date(),
      updated_at: new Date(),
    }],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
