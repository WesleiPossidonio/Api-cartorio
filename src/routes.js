import { Router } from 'express'

import UserController from './app/controlles/UserController.js'
import SessionsController from './app/controlles/SessionsController.js'

import authMiddlewares from './app/meddlewares/auth.js'

import {
  sendMailAssociation,
  sendMailRequeriments,
} from './app/sendMail/index.js'
import ConfirmEmail from './app/controlles/ConfirmEmail.js'
import AssociationDataController from './app/controlles/AssociationDataController.js'
import RequerimentController from './app/controlles/RequerimentController.js'

const routes = new Router()

routes.post('/sessions', SessionsController.store)
routes.post('/confirmMail', ConfirmEmail.store)

routes.use(authMiddlewares)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)

routes.post('/associationData', AssociationDataController.store)
routes.get('/associationList', AssociationDataController.index)
routes.put('/association/:id', AssociationDataController.update)

routes.post('/createRequeriment', RequerimentController.store)
routes.put('/updateRequeriment/:id', RequerimentController.update)

routes.patch('/updatePassword/:id', UserController.update)

routes.post('/sendMailRequeriments', sendMailRequeriments)
routes.post('/sendMailAssociation', sendMailAssociation)

export default routes
