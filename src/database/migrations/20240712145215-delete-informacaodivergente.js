'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('requirement', 'informacao_divergente')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createColumn('requirement', {
      informacao_divergente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
}
