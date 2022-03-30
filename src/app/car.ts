import { Task } from "./task"
export interface Car {
    id:string,
    make:string,
    model:string,
    year:number,
    reg:string,
    tasks: Task[]
}