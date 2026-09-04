import { Sequelize, Model } from 'sequelize'

class UnlistedRequeriments extends Model {
  static init(sequelize) {
    super.init(
      {
        requirement_id: Sequelize.INTEGER,
        name: Sequelize.JSONB,
        status: Sequelize.ENUM('Pendente', 'Concluído'),
        observacao: Sequelize.JSONB,
      },
      {
        sequelize,
        tableName: 'unlisted_requirements',
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Requeriment, {
      foreignKey: 'id',
      as: 'unlisted_requirements',
      underscored: true,
    })
  }
}

export default UnlistedRequeriments
