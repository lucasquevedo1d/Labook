import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import PostData from "../data/PostData";
import { Authenticator } from "../services/Authenticator";


export default class postController{
    post = async (req:Request, res:Response) =>{
        const { photo, description, type } = req.params
        const token = req.headers.authorization as string

        const tokenData = new Authenticator().getTokenData(token)

        const input ={
            photo,
            description,
            type,
            author_id:tokenData.id
        }
        const posts = await new PostBusiness().post(input)
        res.status(201).send({message:"Post criado com sucesso!", posts})
    }

    getPost = async (req:Request, res:Response) =>{
        const {id} = req.params
        const token = req.headers.authorization as string

        const tokenData = new Authenticator().getTokenData(token).id

        if(!tokenData){
            throw new Error("Não autorizado!");
            
        }
        const post = await new PostData().getId(id)
        res.status(200).send(post) 
    }
}