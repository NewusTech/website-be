'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ganti nama tabel di sini
    await queryInterface.renameTable('Testimony', 'testimonies');
  },

  down: async (queryInterface, Sequelize) => {
    // Jika ingin revert perubahan ini
    await queryInterface.renameTable('testimonies', 'Testimony');
  }
};
