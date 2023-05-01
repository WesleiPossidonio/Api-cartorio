import { Router } from 'express'

import UserController from './app/controlles/UserController'
import SessionsController from './app/controlles/SessionsController'

import authMiddlewares from './app/meddlewares/auth'
import RequirementController from './app/controlles/RequirementController'

const routes = new Router()

routes.post('/sessions', SessionsController.store)
routes.post('/users', UserController.store)

routes.use(authMiddlewares)
routes.put('/users/:id', UserController.update)

routes.post('/requerimentData', RequirementController.store)
routes.get('/requeriment', RequirementController.index)
routes.put('/requeriment/:id', RequirementController.update)

export default routes
