"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("access_groups", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('access_groups');
  },
};
