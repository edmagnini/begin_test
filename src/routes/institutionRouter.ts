import express from 'express'
import InstitutionController from '../controller/institution/InstitutionController'

export const institutionRouter = express.Router()

const institutionController = new InstitutionController()

institutionRouter.post("/create", institutionController.create)
institutionRouter.get("/collection", institutionController.getInstitutionCollection)
institutionRouter.get("/:id/collection", institutionController.getInstitutionCollectionById)