'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AboutCompanies', 'siteTitle', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('AboutCompanies', 'siteDescription', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('AboutCompanies', 'siteLogo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('AboutCompanies', 'footerLogo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('AboutCompanies', 'favicon', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AboutCompanies', 'siteTitle');
    await queryInterface.removeColumn('AboutCompanies', 'siteDescription');
    await queryInterface.removeColumn('AboutCompanies', 'siteLogo');
    await queryInterface.removeColumn('AboutCompanies', 'footerLogo');
    await queryInterface.removeColumn('AboutCompanies', 'favicon');
  }
};
