"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Legalitas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyProfile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      aktaPendirian: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      suratPengesahan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sertifikasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bidangUsaha: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      npwp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Legalitas");
  },
};
