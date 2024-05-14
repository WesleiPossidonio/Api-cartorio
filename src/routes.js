import { Router } from 'express'

import UserController from './app/controlles/UserController'
import SessionsController from './app/controlles/SessionsController'
import RequerimentNotListedController from './app/controlles/RequerimentNotListController'

import authMiddlewares from './app/meddlewares/auth'
import RequirementController from './app/controlles/RequirementController'
import { sendMail } from './app/sendMail'
import ConfirmEmail from './app/controlles/ConfirmEmail'

const routes = new Router()

routes.post('/sessions', SessionsController.store)
routes.post('/confirmMail', ConfirmEmail.store)

routes.use(authMiddlewares)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)

routes.post('/requerimentData', RequirementController.store)
routes.get('/requeriment', RequirementController.index)
routes.post('/requerimentNotListed', RequerimentNotListedController.store)
routes.put('/requeriment/:id', RequirementController.update)
routes.patch('/updatePassword/:id', UserController.update)

routes.post('/sendMail', sendMail)

export default routes
