import Post from "../model/Post";
import { Posts } from "../model/types";
import { BaseDataBase } from "./BaseDataBase";

export default class PostData extends BaseDataBase{
    insert = async (post:any):Promise<Post> =>{
        try {
            const user1 = await PostData.connection("labook_posts")
            .insert({id:post.id, photo:post.photo, description:post.description, type:post.type, author_id:post.author_id })
            return Post.PostModel(user1[0])
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
       
    }

    getId = async (id:any):Promise<Post> =>{
        try {
            const post = await PostData.connection("labook_posts")
            .select("*")
            .where("id", id)

            const postId: Posts = {
                id: post[0].id,
                photo: post[0].photo,
                description: post[0].description,
                type: post[0].type,
                
             }
           
            return Post.PostModel(postId)

        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage)
            
        }
    }

} 