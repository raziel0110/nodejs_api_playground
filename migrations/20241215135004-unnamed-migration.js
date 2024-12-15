"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Tasks", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.removeColumn("Tasks", "userId");
  },
};
