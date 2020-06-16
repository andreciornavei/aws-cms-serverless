"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "access_groups",
      [
        {
          id: 1,
          name: "User manager",
        },
        {
          id: 2,
          name: "Content manager",
        },
        {
          id: 3,
          name: "Content curator",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  },
};
