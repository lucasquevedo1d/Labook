import PostData from "../data/PostData";
import Post from "../model/Post";
import { Authenticator } from "../services/Authenticator";
import { GeneratorId } from "../services/GeneratorId";


export default class PostBusiness {
    post = async (input:any)=>{
        const {photo, description, type} = input
        if(!photo || !description ){
            throw new Error("Preencha todos os campos de post!");
            
        }
        const id = new GeneratorId().generator()

        const newPost = new Post(id, photo, description, type)
        const postDB = new PostData()
        await postDB.insert(newPost)
        const authenticator = new Authenticator()
        const token = authenticator.generate({id})

        return token
    }
    
   
}