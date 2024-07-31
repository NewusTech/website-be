'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Teams', 'institute', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'major', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'joinDate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'birthdayDate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Teams', 'linkedin', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Teams', 'institute');
    await queryInterface.removeColumn('Teams', 'major');
    await queryInterface.removeColumn('Teams', 'joinDate');
    await queryInterface.removeColumn('Teams', 'address');
    await queryInterface.removeColumn('Teams', 'birhtdayDate');
    await queryInterface.removeColumn('Teams', 'email');
    await queryInterface.removeColumn('Teams', 'linkedin');
  }
};