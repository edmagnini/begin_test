import Administrator, { authenticationData } from "../../model/Administrator"
import { Authenticator } from "../../services/Authenticator"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"
import transporter from "../../services/mailTransporter"
import { AdministratorRepository } from "./AdministratorRepository"

export type InsertAdministratorDTO = {
    name: string,
    email: string,
    username: string,
    password: string,
    institutionId: string
}
export type ChangeAdministratorDataDTO = {
    id: string,
    name: string,
    email: string,
    password: string
}
export type ChangeAdministratorBusinessDataDTO = {
    token: string,
    name: string,
    email: string,
    password: string
}
export type ChangeAdministratorEmailDTO = {
    email: string,
    id: string
}
export type LoginAdministratorDTO = {
    email: string,
    password: string
}

export default class AdministratorBusiness {
    private administratorData: AdministratorRepository
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator
    constructor(administratorDataImplementation: AdministratorRepository) {
        this.administratorData = administratorDataImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    signup = async (input: InsertAdministratorDTO) => {
        const { name, email, username, password, institutionId } = input

        if (!name) {
            throw new Error("Please, inform a name for administrator.")
        }
        if (!email || email.indexOf("@") === -1) {
            throw new Error("Invalid email")
        }
        if (!username) {
            throw new Error("Please, inform a username for administrator.")
        }
        if (!password) {
            throw new Error("Please, inform a password for administrator.")
        }
        if (password.length < 6 || password.length > 32) {
            throw new Error("Password must contain at least 6 and a maximum of 32 characters")
        }
        if (!institutionId) {
            throw new Error("Please, inform a institution id for administrator.")
        }

        const registeredAdministratorEmail = await this.administratorData.findByEmail(email)
        const registeredAdministratorUsername = await this.administratorData.findByUsername(username)

        if (registeredAdministratorEmail) {
            throw new Error("Email already registered!")
        }
        if (registeredAdministratorUsername) {
            throw new Error("Username already registered!")
        }

        const id = this.idGenerator.generateId()

        const hashedPassword = await this.hashManager.hash(password)

        const administrator = new Administrator(
            id,
            name,
            email,
            username,
            hashedPassword,
            institutionId
        )

        await this.administratorData.signup(administrator)

        const accountData = await this.administratorData.findByEmail(email)

        const authenticationData: authenticationData = {
            id: accountData!.getId(),
            email: accountData!.getEmail()
        }

        const token = this.authenticator.generateToken(authenticationData)

        const mail = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: `${email}`,
            subject: "[NO-REPLY] Your account has been created on Begin donation books!",
            text: `Hello ${name}, welcome to Begin donation books.
            Click <a href="http://localhost:3003/administrator/activateAccount/${token}">here</a> to activate your account.
            Regards,
            Begin team!`,
            html: `<p>Hello ${name}, welcome to Begin donation books.</p>
            <p>Click <a href="http://localhost:3003/administrator/activateAccount/${token}">here</a> to activate your account.</p>
            <p>Regards,</p>
            <p>Begin team!</p>`
        })

        return mail
    }
    activateAccount = async (token: string) => {

        if (!token) {
            throw new Error("No account to activate.")
        }

        const tokenData = this.authenticator.getTokenData(token)

        const accountData = await this.administratorData.findById(tokenData.id)

        if (!accountData) {
            throw new Error("Account not found.")
        }

        await this.administratorData.activateAccount(accountData.getId())
    }
    login = async (loginData: LoginAdministratorDTO) => {
        const { email, password } = loginData

        if (!email) {
            throw new Error("Please, inform administrator's email")
        }
        if (!email || email.indexOf("@") === -1) {
            throw new Error("Invalid email")
        }
        if (!password) {
            throw new Error("Please, inform a password.")
        }

        const accountData = await this.administratorData.findByEmail(email)

        if (!accountData) {
            throw new Error("Account not found.")
        }

        const unHashedPassword = await this.hashManager.compare(password, accountData.getPassword())

        if (!unHashedPassword) {
            throw new Error("Invalid credencials.")
        }

        const payload: authenticationData = {
            id: accountData.getId(),
            email: accountData.getEmail()
        }

        const token = await this.authenticator.generateToken(payload)

        return token
    }
    editAccountData = async (input: ChangeAdministratorBusinessDataDTO) => {
        const { token, name, email, password } = input
        if (!token) {
            throw new Error("Please, inform administrator's id")
        }
        if (!name) {
            throw new Error("Please, inform administrator's name")
        }
        if (!email) {
            throw new Error("Please, inform administrator's email")
        }
        if (!email || email.indexOf("@") === -1) {
            throw new Error("Invalid email")
        }
        if (!password) {
            throw new Error("Please, inform administrator's password")
        }

        const tokenInput = this.authenticator.getTokenData(token)

        const accountData = await this.administratorData.findById(tokenInput.id)

        if (!accountData) {
            throw new Error("administrator not found.")
        }

        const emailCheck = await this.administratorData.findByEmail(email)

        if (emailCheck) {
            throw new Error("Email already registered.")
        }

        const differentEmail: ChangeAdministratorEmailDTO = {
            email,
            id: accountData.getId()
        }
        const hashedPassword = await this.hashManager.hash(password)

        const changeData: ChangeAdministratorDataDTO = {
            id: accountData.getId(),
            name,
            email,
            password: hashedPassword
        }

        await this.administratorData.editAccountData(changeData)

        if (accountData.getEmail() != email) {
            const changeEmailLog = await this.changeEmailSolicitation(differentEmail)
            return changeEmailLog
        }


    }
    changeEmailSolicitation = async (changeData: ChangeAdministratorEmailDTO) => {
        const { email, id } = changeData

        if (!email) {
            throw new Error("Please, inform administrator's email")
        }
        if (!email || email.indexOf("@") === -1) {
            throw new Error("Invalid email")
        }
        if (!id) {
            throw new Error("Please, inform administrator's id")
        }

        const accountData = await this.administratorData.findById(id)

        if (!accountData) {
            throw new Error("administrator not found.")
        }

        if (accountData?.getEmail() === email) {
            throw new Error("Email already registered!")
        }

        const payload: authenticationData = {
            id: accountData.getId(),
            email: email
        }

        const token = this.authenticator.generateToken(payload)

        const mail = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: `${accountData.getEmail()}`,
            subject: "[NO-REPLY] Solicitation to change e-mail!",
            text: `Hello ${accountData.getName()}!.
            We have receveid your solicitation to change you e-mail's account to ${email}. Click <a href="http://localhost:3003/administrator/changeEmail/${token}">here</a>  to confirm.
            Regards,
            Begin team!`,
            html: `<p>Hello ${accountData.getName()}!</p>
            <p>We have receveid your solicitation to change you e-mail's account to ${email}. Click <a href="http://localhost:3003/administrator/changeEmail/${token}">here</a>  to confirm.</p>
            <p>Regards,</p>
            <p>Begin team!</p>`
        })

        return mail
    }
    changeEmail = async (token: string) => {

        if (!token) {
            throw new Error("No account to activate.")
        }

        const tokenData = this.authenticator.getTokenData(token)

        const accountData = await this.administratorData.findById(tokenData.id)

        if (!accountData) {
            throw new Error("Account not found.")
        }

        if (accountData.getEmail() === tokenData.email) {
            throw new Error("Email already registered!")
        }

        const changeData: ChangeAdministratorEmailDTO = {
            id: tokenData.id,
            email: tokenData.email
        }

        await this.administratorData.changeEmail(changeData)

        const refreshedAccountData = await this.administratorData.findById(tokenData.id)

        const mail = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: `${refreshedAccountData?.getEmail()}`,
            subject: "[NO-REPLY] Your e-mail has been changed!",
            text: `Hello ${refreshedAccountData?.getName()}!.
            You e-mail has been changed!
            Regards,
            Begin team!`,
            html: `<p>Hello ${refreshedAccountData?.getName()}!</p>
            <p>You e-mail has been changed!</p>
            <p>Regards,</p>
            <p>Begin team!</p>`
        })

        return mail
    }
    deleteAdministrator = async (token: string) => {
        if (!token) {
            throw new Error("No account info to delete.")
        }

        const tokenData = await this.authenticator.getTokenData(token)

        await this.administratorData.deleteAdministrator(tokenData.id)
    }
}