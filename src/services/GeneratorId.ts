import { v4 } from "uuid";

export class GeneratorId{
    generator():string {
        return v4()
    }
    
}