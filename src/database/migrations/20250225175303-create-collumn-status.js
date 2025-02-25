'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'association_data',
      'status_association',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Pendente',
      }
    )
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(
      'association_data',
      'status_association'
    )
  }
};
