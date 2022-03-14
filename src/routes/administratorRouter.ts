import express from 'express'
import AdministratorController from '../controller/administrator/AdministratorController'

export const administratorRouter = express.Router()

const administratorController = new AdministratorController()

administratorRouter.post("/login", administratorController.login)
administratorRouter.post("/create", administratorController.signup)
administratorRouter.post("/activateAccount/:token", administratorController.activateAccount)
administratorRouter.post("/edit", administratorController.editAccountData)
administratorRouter.post("/changeEmail/:token", administratorController.changeEmail)
administratorRouter.delete("/delete", administratorController.deleteAdministrator)