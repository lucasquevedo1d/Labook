import UserData from "../data/userData";
import { Login } from "../model/types";
import User from "../model/User"
import { Authenticator } from "../services/Authenticator";
import { GeneratorId } from "../services/GeneratorId";
import { HashManager } from "../services/HashManager";

export default class UserBusiness{
    signup = async (input:any) =>{
        
        const {name, email, password} = input 
        if(!name || !email || !password){
            throw new Error("Preencha todos os campos!");
            
        }

        const user = await new UserData().findUserByEmail(email)
        if(user){
            throw new Error("Usuário já cadstrado!");
            
        }

        const id = new GeneratorId().generator() 
        const hash = new HashManager().createHash(password)

        const newUser = new User(id, name, email, hash)
        const userDB = new UserData()
        await userDB.insert(newUser)
        const authenticator = new Authenticator()
        const token = authenticator.generate({id:id}) 
        console.log(token)
       
        
        return token 
        
    }

    login = async (login:Login) =>{
        const {email, password} = login 
        if(!email || !password){
            throw new Error("Email e senha invalidos!");
            
        }

        const user = await new UserData().findUserByEmail(email)
        if(!user){
            throw new Error("Email não cadastrado!");
            
        }
        
        const hash = new HashManager()
        const correctPass= hash.compareHash(password, user.getPass())
        
        if(!correctPass){
            throw new Error("Senha invalida!");
            
        }
        const authenticator =  new Authenticator()
        const token = authenticator.generate({id:user.getId()})
        return token
    }
    friend = (user1:string, user2:string):Promise<any> =>{
        
        if(!user1 || !user2){
            throw new Error("Usuário invalido!")
        }
        const friendShip = new UserData().createFriend(user1, user2)
        return friendShip
    }


    delete = async (idFriend:string, token:string) =>{
        console.log(token)
        if(!idFriend){
            throw new Error("Usuário não encontrado!");
            
        }

        const idUser = new Authenticator().getTokenData(token).id
        if(!idUser){
          throw new Error("Não autorizado!");
          
        }

        const friend1 = await new UserData().friends(idFriend)
        if(!friend1){
            throw new Error("Não encotrado!");
            
        }
        

        const deleteFriends = new UserData().delete(idUser, idFriend)
        return deleteFriends
    }

}