import { Sequelize, Model } from 'sequelize'

class Requeriment extends Model {
  static init(sequelize) {
    super.init(
      {
        exigencias_id: Sequelize.INTEGER,
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
        informacao_divergente: Sequelize.STRING,
        requisitos_criacao_de_estatuto: Sequelize.STRING,
        requisitos_de_estatutos_fundadores: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'requirement',
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.AssociationData, {
      foreignKey: 'exigencias_id',
      as: 'DadosAssociacao',
    })
  }
}

export default Requeriment
