import { Router } from 'express'
import UserController from './app/controlles/UserController'
import SessionsController from './app/controlles/SessionsController'
import authMiddlewares from './app/meddlewares/auth'
import { sendMailRequeriments, sendMailAssociation } from './app/sendMail'
import AssociationDataController from './app/controlles/AssociationDataController'
import RequerimentController from './app/controlles/RequerimentController'
import ConfirmEmail from './app/controlles/ConfirmEmail'

const routes = new Router()

routes.post('/sessions', SessionsController.store)
routes.get('/check-auth', SessionsController.index)
routes.post('/confirmMail', ConfirmEmail.store)
routes.post('/users', UserController.store)
routes.patch('/updatePassword/:id', UserController.update)

routes.use(authMiddlewares)
routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.delete)
routes.put('/users/:id', UserController.update)
routes.post('/associationData', AssociationDataController.store)
routes.get('/associationList', AssociationDataController.index)
routes.get(
  '/association/pending',
  AssociationDataController.pendingWithoutRequirement,
)
routes.get(
  '/association/requirements',
  AssociationDataController.pendingRequirements,
)
routes.get(
  '/association/completed',
  AssociationDataController.completedAssociations,
)
routes.delete('/requeriment/:id', RequerimentController.delete)
routes.get('/association/:id', AssociationDataController.findById)
routes.put('/association/:id', AssociationDataController.update)
routes.post('/createRequeriment', RequerimentController.store)
routes.put('/updateRequeriment/:id', RequerimentController.update)
routes.post('/sendMailRequeriments', sendMailRequeriments)
routes.post('/sendMailAssociation', sendMailAssociation)
routes.put('/bulkUpdate', AssociationDataController.bulkUpdate)

export default routes
