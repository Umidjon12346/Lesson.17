import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  courseId: number;
  status: "new" | "active" | "completed" | "cancelled" | "pending";
  start_date: string;
  start_time: string;
  roomId: number;
  course?: {
    id: number;
  };
}


export interface AddGroupTeacher {
  groupId: number;
  teacherId: number[];
  status: boolean;
  start_date: string;
}

export interface GroupTeachersType{
    teachers:Teacher[]
}

export interface GroupStudentsType{
    students:Student[]
}