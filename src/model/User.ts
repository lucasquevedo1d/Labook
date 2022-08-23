export default class User {
    
    constructor(
       private id: string,
       private name: string,
       private email: string,
       private password: string
    ) { }
    static userModel = (data:any) =>{
        return new User(data.id, data.name, data.email, data.password)
    }
    getPass = () =>{
        return this.password
    }
    getId = () =>{
        return this.id
    }
    
}

