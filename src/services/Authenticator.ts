import * as jwt from "jsonwebtoken"
import { authenticationData } from "../model/Administrator"




export class Authenticator {
    generateToken = (
        payload: authenticationData
    ): string => {
        return jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN as string
            }
        )
    }
    getTokenData = (
        token: string
    ): authenticationData => {
        return jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as authenticationData
    }
}



