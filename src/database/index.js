import Sequelize from 'sequelize'
import User from '../app/models/User'

import configDataBase from '../config/database'
import Requeriment from '../app/models/Requeriment'

const models = [User, Requeriment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
