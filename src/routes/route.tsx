import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";
import { SignIn, SignUp } from "../pages";

// Lazy loaded components
const App = lazy(() => import("../App"));

function Router() {
  const route = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index element={<SignIn/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
    </Route>)
  );

  return <RouterProvider router={route} />;
}

export default Router;
