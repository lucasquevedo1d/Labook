import * as jwt from "jsonwebtoken"


export interface AuthenticatorData {
    id:string,
    
}

export class Authenticator {
    generate(payload:AuthenticatorData):string{
        const token = jwt.sign(payload, process.env.JWK_KEY as string, {
            expiresIn:"300h"
        })
        return token as string
    }

    getTokenData(token:string){
        const data =jwt.verify(token, process.env.JWK_KEY as string)
        return data as AuthenticatorData
    }
    
}