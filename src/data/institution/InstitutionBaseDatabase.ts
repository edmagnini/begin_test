
import { InstitutionRepository } from "../../business/institution/InstitutionRepository";
import Institution from "../../model/Institution";
import { prismaClient } from "../BaseDatabase";


export default class InstitutionBaseDatabase implements InstitutionRepository {


    create = async (institution: Institution) => {
        try {
            await prismaClient.institution.create({
                data: {
                    name: institution.getName(),
                    cep: institution.getCep(),
                    state: institution.getState(),
                    city: institution.getCity(),
                    neighborhood: institution.getNeighborhood(),
                    adress: institution.getAdress(),
                },
            })
            return institution
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    findByName = async (name: string) => {
        try {
            const queryResult: any = await prismaClient.institution.findFirst({
                where: {
                    name,
                }
            })
            if (queryResult) {
                const institutionResult = new Institution(
                    queryResult.id,
                    queryResult.name,
                    queryResult.cep,
                    queryResult.state,
                    queryResult.city,
                    queryResult.neighborhood,
                    queryResult.adress
                )
                return institutionResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    getInstitutionCollection = async () => {
        try {
            const queryResult: any = await prismaClient.institution.findMany({
                include: {
                    Book: true
                }
            })
            return queryResult           
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    getInstitutionCollectionById = async (id: string) => {
        try {
            const queryResult: any = await prismaClient.institution.findFirst({
                where: {
                    id,
                },
                include: {
                    Book: true
                }
            })
            return queryResult           
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}