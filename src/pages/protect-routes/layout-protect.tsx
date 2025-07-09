import type { ReactNode } from "react"
import { getItem } from "../../helpers"
import { Navigate } from "react-router-dom"

function LayoutProtect({children}:{children:ReactNode}) {
    const isAuth = getItem("access_token");
    if(!isAuth){
        return <Navigate to={"/"} replace/>
    }
  return (
    <>{children}</>
  )
}

export default LayoutProtect