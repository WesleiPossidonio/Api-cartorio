import Sequelize from 'sequelize'
import User from '../app/models/User'

import configDataBase from '../config/database'

import AssociationData from '../app/models/AssociationData'
import Requeriment from '../app/models/Requeriment'

const models = [User, AssociationData, Requeriment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
