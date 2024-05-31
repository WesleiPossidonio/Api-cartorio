'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('association_data', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      data_da_recepcao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_do_protocolo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      nome_da_instituicao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_do_representante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_do_representante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone_contato: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_atualizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('association_data')
  },
}
