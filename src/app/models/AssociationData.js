import { Sequelize, Model } from 'sequelize'

class AssociationData extends Model {
  static init (sequelize) {
    super.init(
      {
        numero_do_protocolo: Sequelize.INTEGER,
        nome_da_instituicao: Sequelize.STRING,
        cnpj_cpf: Sequelize.STRING,
        nome_do_representante: Sequelize.STRING,
        email_do_representante: Sequelize.STRING,
        telefone_contato: Sequelize.STRING,
        sobre_exigencia: Sequelize.STRING,
        status_association: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'association_data',
      }
    )
    return this
  }

  static associate (models) {
    this.hasOne(models.Requeriment, {
      foreignKey: 'exigencias_id',
      as: 'exigencias',
    })
  }
}

export default AssociationData
