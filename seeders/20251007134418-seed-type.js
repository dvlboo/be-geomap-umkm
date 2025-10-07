'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('types', [
      { name: 'Makanan Berat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jajan Camilan Khas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Minuman', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  }
};
