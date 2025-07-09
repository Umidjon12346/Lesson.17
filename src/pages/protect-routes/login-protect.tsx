import { Navigate } from "react-router-dom"
import { getItem } from "../../helpers"
import type { ReactNode } from "react"


function LoginProtect({children}:{children:ReactNode}) {
  const isAuth = getItem("access_token");
  const role = getItem("role")
  if (isAuth) {
    return <Navigate to={`/${role}`} replace />;
  }
  return <>{children}</>;
}

export default LoginProtect