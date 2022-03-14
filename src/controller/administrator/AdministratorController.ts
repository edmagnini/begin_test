import { Request, Response } from "express";
import AdministratorBusiness, { ChangeAdministratorBusinessDataDTO, ChangeAdministratorDataDTO, ChangeAdministratorEmailDTO, InsertAdministratorDTO, LoginAdministratorDTO } from "../../business/administrator/AdministratorBusiness";
import AdministratorBaseDatabase from "../../data/administrator/AdministratorBaseDatabase";

export default class AdministratorController {
    private AdministratorBusiness: AdministratorBusiness
    constructor() {
        this.AdministratorBusiness = new AdministratorBusiness(new AdministratorBaseDatabase())
    }

    signup = async (req: Request, res: Response) => {
        const { name, email, username, password, institutionId } = req.body

        const input: InsertAdministratorDTO = {
            name,
            email,
            username,
            password,
            institutionId
        }
        try {
            const mail = await this.AdministratorBusiness.signup(input)

            res.status(200).send({ mail, message: "Administrator has been created!" })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Signup Error.")
        }
    }
    activateAccount = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        try {
            await this.AdministratorBusiness.activateAccount(token!)

            res.status(200).send("Activated account!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Activate account Error.")
        }
    }
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        
        const loginData: LoginAdministratorDTO = {
            email,
            password
        }

        try {
            const token = await this.AdministratorBusiness.login(loginData)

            res.status(200).send({token})
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Login Error.")
        }
    }
    editAccountData = async (req: Request, res: Response) => {
        const { name, email, password } = req.body
        const token: string = req.headers.authorization as string

        const changeData: ChangeAdministratorBusinessDataDTO = {
            token,
            name,
            email,
            password
        }

        try {
            const mail = await this.AdministratorBusiness.editAccountData(changeData)

            res.status(200).send({ mail, message: "Successfuly edit!" })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Edit account Error.")
        }
    }
    changeEmailSolicitation = async (req: Request, res: Response) => {
        const { email } = req.body
        const id = req.params.id

        const changeData: ChangeAdministratorEmailDTO = {
            email,
            id
        }

        try {
            const mail = await this.AdministratorBusiness.changeEmailSolicitation(changeData)

            res.status(200).send({ mail, message: "Solicitation for change e-mail successfuly!" })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Solicitation Error.")
        }
    }
    changeEmail = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        try {
            const mail = await this.AdministratorBusiness.changeEmail(token!)

            res.status(200).send({ mail, message: "E-mail has been changed!" })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Change e-mail Error.")
        }
    }
    deleteAdministrator = async (req: Request, res: Response) => {
        const token = req.headers.authorization

        try {
            const mail = await this.AdministratorBusiness.deleteAdministrator(token!)

            res.status(200).send("Account has been deleted!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Delete Error.")
        }
    }

}
