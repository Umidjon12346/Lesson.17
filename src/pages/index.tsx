import { lazy } from "react";

const SignIn = lazy(()=> import('./auth/sign-in'))
const SignUp = lazy(()=> import('./auth/sign-up'))
const StudentLayout = lazy(()=>import("./student-layout/student"))
const AdminLayout = lazy(()=>import("./admin-layout/admin"))
const TeacherLayout = lazy(()=>import("./teacher-layout/teacher"))
const Groups = lazy(()=>import("./groups/groups"))

export {SignIn,SignUp,StudentLayout,AdminLayout,TeacherLayout,Groups}