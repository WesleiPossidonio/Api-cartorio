'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'requirement',
      'observations_declaracao_sindical',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_lista_e_edital',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_assinatura_do_advogado',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_declaracao_criminal',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_declaracao_de_desimpedimento',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn('requirement', 'observations_livro_rasao', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'Sem observações',
    })

    await queryInterface.addColumn(
      'requirement',
      'observations_requisitos_estatuto',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn('requirement', 'observations_ppe', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'Sem observações',
    })

    await queryInterface.addColumn(
      'requirement',
      'observations_requisitos_criacao_de_estatuto',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_dissolucao_ou_exticao',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn('requirement', 'observations_fundacoes', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'Sem observações',
    })

    await queryInterface.addColumn(
      'requirement',
      'observations_reconhecimento_de_firma',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn('requirement', 'observations_oab', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'Sem observações',
    })

    await queryInterface.addColumn(
      'requirement',
      'observations_documentacao_de_identificacao',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_requisitos_de_estatutos_fundadores',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_campo_de_assinatura',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )

    await queryInterface.addColumn(
      'requirement',
      'observations_retificacao_de_redacao',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Sem observações',
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'requirement',
      'observations_declaracao_sindical'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_lista_e_edital'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_assinatura_do_advogado'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_declaracao_criminal'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_declaracao_de_desimpedimento'
    )

    await queryInterface.removeColunm('requirement', 'observations_livro_rasao')

    await queryInterface.removeColunm(
      'requirement',
      'observations_requisitos_estatuto'
    )

    await queryInterface.removeColunm('requirement', 'observations_ppe')

    await queryInterface.removeColunm(
      'requirement',
      'observations_requisitos_criacao_de_estatuto'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_dissolucao_ou_exticao'
    )

    await queryInterface.removeColunm('requirement', 'observations_fundacoes')

    await queryInterface.removeColunm(
      'requirement',
      'observations_reconhecimento_de_firma'
    )

    await queryInterface.removeColunm('requirement', 'observations_oab')

    await queryInterface.removeColunm(
      'requirement',
      'observations_documentacao_de_identificacao'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_requisitos_de_estatutos_fundadores'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_campo_de_assinatura'
    )

    await queryInterface.removeColunm(
      'requirement',
      'observations_retificacao_de_redacao'
    )
  },
}
