import { Request, Response } from "express";
import InstitutionBusiness, { InsertInstitutionDTO } from "../../business/institution/InstitutionBusiness";
import InstitutionBaseDatabase from "../../data/institution/InstitutionBaseDatabase";

export default class InstitutionController {
    private InstitutionBusiness: InstitutionBusiness
    constructor() {
        this.InstitutionBusiness = new InstitutionBusiness(new InstitutionBaseDatabase())
    }

    create = async (req: Request, res: Response) => {
        const { name, cep, state, city, neighborhood, adress } = req.body

        const input: InsertInstitutionDTO = {
            name,
            cep,
            state,
            city,
            neighborhood,
            adress
        }
        try {
            await this.InstitutionBusiness.create(input)
            res.status(200).send("Institution has been created!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Create institution Error.")
        }
    }
    getInstitutionCollection = async (req: Request, res: Response) => {
        try {
            const result = await this.InstitutionBusiness.getInstitutionCollection()

            res.status(200).send(result)
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Get collection Error.")
        }
    }
    getInstitutionCollectionById = async (req: Request, res: Response) => {
        const id  = req.params.id
        try {
            const result = await this.InstitutionBusiness.getInstitutionCollectionById(id)

            res.status(200).send(result)
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Get collection Error.")
        }
    }
}