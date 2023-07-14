'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requeriments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      existe_exigencias_nao_listadas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exigencias_nao_listadas_id: {
        type: Sequelize.INTEGER,
        references: { model: 'requirements_not_listed', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      data_da_recepcao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_do_protocolo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      estado_do_requerimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_da_instituicao: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      declaracao_sindical: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lista_e_edital: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assinatura_do_advogado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      declaracao_criminal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      declaracao_de_desimpedimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      livro_rasao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requisitos_estatuto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ppe: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requisitos_criacao_de_estatuto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dissolucao_ou_exticao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fundacoes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requisitos_de_estatutos_fundadores: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reconhecimento_de_firma: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preechimento_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oab: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      documentacao_de_identificacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      campo_de_assinatura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      retificacao_de_redacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      informacao_divergente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_atualizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quais_informacoes_divergentes: {
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
    await queryInterface.dropTable('requeriments')
  },
}
