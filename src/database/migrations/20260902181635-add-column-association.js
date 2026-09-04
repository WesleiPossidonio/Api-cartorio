'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('association_data', 'data_da_recepcao', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('association_data', 'data_da_recepcao')
  },
}
