import express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'

import './database'
dotenv.config()

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
