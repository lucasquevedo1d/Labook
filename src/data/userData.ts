import User from "../model/User"
import { BaseDataBase } from "./BaseDataBase";


export default class UserData extends BaseDataBase {
    insert = async (user: any) => {
        const user2 = await UserData.connection("labook_users")
            .insert(user)
            return user2
            }
       
    

    findUserByEmail = async (email: string): Promise<User> => {
        try {
            const user1 = await UserData.connection("labook_users")
                .select("*")
                .where({ email })
            return User.userModel(user1[0])
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)

        }
    

    }

    login = async (email:string):Promise<User> =>{
        try {
            const user3 = await UserData.connection("labook_users")
            .select("*")
            .where({email})
            return user3[0]
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
            
        }
    }

    friends = async (id:string)=>{
        try {
            const user = await UserData.connection("labook_users")
            .select("*")
            .where({id})
            return user[0]
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
            
        }
    }

    createFriend = async (user1:string, user2:string) =>{
        try {
            const user = await UserData.connection("labook_friends")
            .insert({
                user1,
                user2
            })
            return user[0]
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }

    delete = async (IdUser:string, IdFriend:string) =>{
        try {
         
            await UserData.connection("labook_friends")
            .del()
            .where({user1:IdUser, user2:IdFriend})
            .orWhere({user1:IdFriend, user2:IdUser})
            
            
        } catch (error:any) {
            throw new Error("Erro na tentativa!");
            
        }
    }
}