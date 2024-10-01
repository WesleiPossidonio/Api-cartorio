import { Router } from 'express'

import UserController from './app/controlles/UserController'
import SessionsController from './app/controlles/SessionsController'

import authMiddlewares from './app/meddlewares/auth'

import { sendMailRequeriments, sendMailAssociation } from './app/sendMail'
import ConfirmEmail from './app/controlles/ConfirmEmail'
import AssociationDataController from './app/controlles/AssociationDataController'
import RequerimentController from './app/controlles/RequerimentController'

const routes = new Router()

routes.post('/sessions', SessionsController.store)
routes.post('/confirmMail', ConfirmEmail.store)

routes.post('/users', UserController.store)
routes.use(authMiddlewares)

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
