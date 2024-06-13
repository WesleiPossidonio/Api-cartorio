import express from 'express'
import routes from './routes'
import cors from 'cors'

import './database/index'

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())

    this.app.use(
      cors({
        origin: (origin, callback) => this.checkOrigin(origin, callback),
      })
    )
  }

  routes() {
    this.app.use(routes)
  }

  checkOrigin(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://project-cartorio.vercel.app',
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // Permitir acesso
    } else {
      callback(new Error('Acesso bloqueado por política de CORS'))
    }
  }
}

export default new App().app
