import Sequelize from 'sequelize'
import User from '../app/models/User.js'
import AssociationData from '../app/models/AssociationData.js'
import Requeriment from '../app/models/Requeriment.js'
import configDataBase from '../config/database.js'

const models = [User, AssociationData, Requeriment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models.forEach((model) => model.init(this.connection))
    models.forEach(
      (model) => model.associate && model.associate(this.connection.models)
    )
  }
}

export default new Database()
