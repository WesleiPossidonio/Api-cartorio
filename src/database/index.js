import Sequelize from 'sequelize'
import User from '../app/models/User'

import configDataBase from '../config/database'
import Requeriment from '../app/models/Requeriment'
import RequerimentNotListed from '../app/models/RequerimentNotListed'

const models = [User, Requeriment, RequerimentNotListed]

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
