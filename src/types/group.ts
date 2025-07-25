import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
    id?: number;
    name:string,
    course_id:number,
    status:string,
    start_date:string,
    end_date:string,
}

export interface GroupTeachersType{
    teachers:Teacher[]
}

export interface GroupStudentsType{
    students:Student[]
}