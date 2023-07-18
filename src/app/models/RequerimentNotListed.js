import { Sequelize, Model } from 'sequelize'

class NotListedRequeriment extends Model {
  static init(sequelize) {
    super.init(
      {
        primeira_exigencia: Sequelize.STRING,
        estado_da_primeira_exigencia: Sequelize.STRING,
        segunda_exigencia: Sequelize.STRING,
        estado_da_segunda_exigencia: Sequelize.STRING,
        terceira_exigencia: Sequelize.STRING,
        estado_da_terceira_exigencia: Sequelize.STRING,
        quarta_exigencia: Sequelize.STRING,
        estado_da_quarta_exigencia: Sequelize.STRING,
        quinta_exigencia: Sequelize.STRING,
        estado_da_quinta_exigencia: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Requeriment, {
      foreignKey: 'exigencias_nao_listadas_id',
      as: 'exigencias_nao_listadas',
    })
  }
}

export default NotListedRequeriment
