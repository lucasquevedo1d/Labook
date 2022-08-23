enum Types {
    NORMAL="normal",
    EVENT ="event"
}

export default class Post {
    
    constructor(
       private  id:string,
       private photo:string,
       private description:string,
       private type:Types,
    
    ) { }
    static PostModel = (data:any) =>{
        return new Post(data.id, data.photo, data.description, data.type)
    }
    getId = () =>{
        return this.id
    }

    getPhoto = () =>{
        return this.photo
    }

    getdescription = () =>{
        return this.description
    }
    getType = () =>{
        return this.type
    }
}

