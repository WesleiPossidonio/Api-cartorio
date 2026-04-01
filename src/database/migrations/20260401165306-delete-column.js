'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Remove as duas colunas
    await queryInterface.removeColumn('requirement', 'declaracao_sindical')
    await queryInterface.removeColumn(
      'requirement',
      'observations_declaracao_sindical',
    )
  },

  async down(queryInterface, Sequelize) {
    // Recria a coluna 'declaracao_sindical'
    await queryInterface.addColumn('requirement', 'declaracao_sindical', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    // Recria a coluna 'observations_declaracao_sindical'
    await queryInterface.addColumn(
      'requirement',
      'observations_declaracao_sindical',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    )
  },
}
