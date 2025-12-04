import { Sequelize, Model } from 'sequelize'

class Requeriment extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        association_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        declaracao_sindical: Sequelize.STRING,
        lista_e_edital: Sequelize.STRING,
        assinatura_do_advogado: Sequelize.STRING,
        declaracao_criminal: Sequelize.STRING,
        declaracao_de_desimpedimento: Sequelize.STRING,
        livro_rasao: Sequelize.STRING,
        requisitos_estatuto: Sequelize.STRING,
        ppe: Sequelize.STRING,
        dissolucao_ou_exticao: Sequelize.STRING,
        fundacoes: Sequelize.STRING,
        reconhecimento_de_firma: Sequelize.STRING,
        preechimento_completo: Sequelize.STRING,
        oab: Sequelize.STRING,
        documentacao_de_identificacao: Sequelize.STRING,
        campo_de_assinatura: Sequelize.STRING,
        retificacao_de_redacao: Sequelize.STRING,
        informacao_divergente: Sequelize.JSONB,
        requisitos_criacao_de_estatuto: Sequelize.STRING,
        requisitos_de_estatutos_fundadores: Sequelize.STRING,
        estado_do_requerimento: Sequelize.STRING,
        requerimento_eletronico_rcpj: Sequelize.STRING,

        observations_declaracao_sindical: Sequelize.TEXT,
        observations_lista_e_edital: Sequelize.TEXT,
        observations_assinatura_do_advogado: Sequelize.TEXT,
        observations_declaracao_criminal: Sequelize.TEXT,
        observations_declaracao_de_desimpedimento: Sequelize.TEXT,
        observations_livro_rasao: Sequelize.TEXT,
        observations_requisitos_estatuto: Sequelize.TEXT,
        observations_ppe: Sequelize.TEXT,
        observations_requisitos_criacao_de_estatuto: Sequelize.TEXT,
        observations_dissolucao_ou_exticao: Sequelize.TEXT,
        observations_fundacoes: Sequelize.TEXT,
        observations_reconhecimento_de_firma: Sequelize.TEXT,
        observations_oab: Sequelize.TEXT,
        observations_documentacao_de_identificacao: Sequelize.TEXT,
        observations_requisitos_de_estatutos_fundadores: Sequelize.TEXT,
        observations_campo_de_assinatura: Sequelize.TEXT,
        observations_retificacao_de_redacao: Sequelize.TEXT,
        observations_requerimento_eletronico_rcpj: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'requirement',
      }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.AssociationData, {
      foreignKey: 'exigencias_id',
      as: 'DadosAssociacao',
    })
  }
}

export default Requeriment
