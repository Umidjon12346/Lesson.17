import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";
import {
  SignIn,
  SignUp,
  StudentLayout,
  TeacherLayout,
  AdminLayout,
  Groups,
  LayoutProtect,
  LoginProtect,
  CourseLayout,
  BranchLayout,
  RoomLayout,
  SingleGroup,
  NotFound,
} from "../pages";

const App = lazy(() => import("../App"));

function Router() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginProtect>
              <SignIn />
            </LoginProtect>
          }
        />
        <Route path="sign-up" element={<SignUp />} />

        <Route
          path="admin"
          element={
            <LayoutProtect>
              <AdminLayout />
            </LayoutProtect>
          }
        >
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:id" element={<SingleGroup />} />
          <Route path="students" element={<StudentLayout />} />
          <Route path="courses" element={<CourseLayout />} />
          <Route path="teacher" element={<TeacherLayout />} />
          <Route path="branch" element={<BranchLayout />} />
          <Route path="rooms" element={<RoomLayout />} />
        </Route>

        {/* STUDENT */}
        <Route path="student" element={<StudentLayout />}></Route>

        {/* TEACHER */}
        <Route path="teacher" element={<TeacherLayout />}></Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={route} />;
}

export default Router;
