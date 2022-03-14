import { Book } from "@prisma/client"
import Institution from "../../model/Institution"
import { IdGenerator } from "../../services/IdGenerator"
import { InstitutionRepository } from "./InstitutionRepository"

export type InsertInstitutionDTO = {
    name: string,
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    adress: string,
}
export type InstitutionBookDTO = {
    name: string,
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    adress: string,
    book: Book
}

export default class InstitutionBusiness {
    private institutionData: InstitutionRepository
    private idGenerator: IdGenerator
    constructor(institutionrDataImplementation: InstitutionRepository) {
        this.institutionData = institutionrDataImplementation
        this.idGenerator = new IdGenerator()
    }

    create = async (input: InsertInstitutionDTO) => {
        const { name, cep, state, city, neighborhood, adress} = input

        if (!name) {
            throw new Error("Please, inform a name for institution.")
        }
        if (!cep || !state || !city || !neighborhood || !adress) {
            throw new Error("Please, check adress fields.")
        }

        const registeredInstitution = await this.institutionData.findByName(name)
        if (registeredInstitution) {
            throw new Error("Institution already exists!")
        }

        const id = this.idGenerator.generateId()

        const institution = new Institution(
            id,
            name,
            cep,
            state,
            city,
            neighborhood,
            adress
        )

        await this.institutionData.create(institution)
    }
    getInstitutionCollection = async () => {
        const result = await this.institutionData.getInstitutionCollection()
        return result
    }
    getInstitutionCollectionById = async (id: string) => {
        const result = await this.institutionData.getInstitutionCollectionById(id)
        return result
    }
}