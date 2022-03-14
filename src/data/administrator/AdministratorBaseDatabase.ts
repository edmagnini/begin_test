import { ChangeAdministratorDataDTO, ChangeAdministratorEmailDTO } from "../../business/administrator/AdministratorBusiness";
import { AdministratorRepository } from "../../business/administrator/AdministratorRepository";
import Administrator from "../../model/Administrator";
import { prismaClient } from "../BaseDatabase";

export default class AdministratorBaseDatabase implements AdministratorRepository {

    signup = async (administrator: Administrator) => {
        try {
            await prismaClient.administrator.create({
                data: {
                    name: administrator.getName(),
                    email: administrator.getEmail(),
                    username: administrator.getUsername(),
                    password: administrator.getPassword(),
                    institutionId: administrator.getInstitutionId()
                }
            })
            return administrator
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    activateAccount = async (id: string) => {
        try {
            await prismaClient.administrator.update({
                where: {
                    id,
                },
                data: {
                    status: "VERIFIED",
                },
            })
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    findByEmail = async (email: string) => {
        try {
            const queryResult: any = await prismaClient.administrator.findFirst({
                where: {
                    email,
                }
            })

            if (queryResult) {
                const administratorResult = new Administrator(
                    queryResult.id,
                    queryResult.name,
                    queryResult.email,
                    queryResult.username,
                    queryResult.password,
                    queryResult.institutionId
                )
                return administratorResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    findByUsername = async (username: string) => {
        try {
            const queryResult: any = await prismaClient.administrator.findFirst({
                where: {
                    username,
                }
            })

            if (queryResult) {
                const administratorResult = new Administrator(
                    queryResult.id,
                    queryResult.name,
                    queryResult.email,
                    queryResult.username,
                    queryResult.password,
                    queryResult.institutionId
                )
                return administratorResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    findById = async (id: string) => {
        try {
            const queryResult: any = await prismaClient.administrator.findFirst({
                where: {
                    id,
                }
            })
            if (queryResult) {
                const administratorResult = new Administrator(
                    queryResult.id,
                    queryResult.name,
                    queryResult.email,
                    queryResult.username,
                    queryResult.password,
                    queryResult.InstitutionId
                )
                return administratorResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    editAccountData = async (changeData: ChangeAdministratorDataDTO)=> {
        try {
            await prismaClient.administrator.update({
                where: {
                    id: changeData.id,
                },
                data: {
                    name: changeData.name,
                    password: changeData.password,
                },
            })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    changeEmail = async (changeData: ChangeAdministratorEmailDTO) => {
        try {
            await prismaClient.administrator.update({
                where: {
                    id: changeData.id,
                },
                data: {
                    email: changeData.email
                }
            })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    deleteAdministrator= async(id: string) => {
        try {
            await prismaClient.administrator.delete({
                where: {
                    id,
                },
            })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}