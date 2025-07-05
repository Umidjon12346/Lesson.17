import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";
import { SignIn, SignUp,StudentLayout,TeacherLayout,AdminLayout,Groups } from "../pages";

const App = lazy(() => import("../App"));

function Router() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        

        <Route path="admin" element={<AdminLayout/>} >
          <Route path="groups" element={<Groups/>}/>
        </Route>

        {/* STUDENT */}
        <Route path="student" element={<StudentLayout/>} >

        </Route>

        {/* TEACHER */}
        <Route path="teacher" element={<TeacherLayout/>} >

        </Route>

      </Route>
    )
  );

  return <RouterProvider router={route} />;
}

export default Router;
