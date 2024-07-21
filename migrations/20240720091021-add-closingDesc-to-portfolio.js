'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Portfolios', 'TechnologyPortofolioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'TechnologyPortofolios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Portfolios', 'closingDescription', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Portfolios', 'TechnologyPortofolioId');
    await queryInterface.removeColumn('Portfolios', 'closingDescription');
  },
};
