'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionar a coluna permitindo valores nulos
    await queryInterface.addColumn('requirement', 'informacao_divergente', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('requirement', 'informacao_divergente')
  },
}
