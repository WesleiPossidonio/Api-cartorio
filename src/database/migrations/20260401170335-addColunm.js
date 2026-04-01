'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('requirement', 'documento_inelegivel', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn(
      'requirement',
      'observations_documento_inelegivel',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    )
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('requirement', 'documento_inelegivel')
    await queryInterface.removeColumn(
      'requirement',
      'observations_documento_inelegivel',
    )
  },
}
