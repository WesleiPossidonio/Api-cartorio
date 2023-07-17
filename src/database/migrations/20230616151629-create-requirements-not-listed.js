module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listed_requirements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      primeira_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado_da_primeira_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      segunda_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado_da_segunda_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      terceira_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado_da_terceira_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quarta_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado_da_quarta_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quinta_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado_da_quinta_exigencia: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('not_listed_requirements')
  },
}
