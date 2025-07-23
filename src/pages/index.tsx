import { lazy } from "react";

const SignIn = lazy(()=> import('./auth/sign-in'))
const SignUp = lazy(()=> import('./auth/sign-up'))
const StudentLayout = lazy(()=>import("./student-layout/student"))
const AdminLayout = lazy(()=>import("./admin-layout/admin"))
const TeacherLayout = lazy(()=>import("./teacher-layout/teacher"))
const Groups = lazy(()=>import("./groups/groups"))
const LayoutProtect = lazy(()=>import("./protect-routes/layout-protect"))
const LoginProtect = lazy(()=>import("./protect-routes/login-protect"))
const CourseLayout = lazy(()=>import("./course-layout/course"))
const BranchLayout = lazy(()=>import("./branch/branch"))
const RoomLayout = lazy(()=>import("./rooms/room"))
const SingleGroup = lazy(()=>import("./groups/single-group"))
const Worker = lazy(()=>import("./worker/worker"))
const NotFound = lazy(()=>import("./worker/not-found"))


export {
  SignIn,
  SignUp,
  StudentLayout,
  AdminLayout,
  TeacherLayout,
  Groups,
  LayoutProtect,
  LoginProtect,
  CourseLayout,
  Worker,
  BranchLayout,
  SingleGroup,
  RoomLayout,
  NotFound,
};