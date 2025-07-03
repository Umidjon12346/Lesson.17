import { Outlet } from "react-router-dom"

function Admin() {
  return (
    <div><h1>admin</h1>
    <Outlet/>
    </div>
  )
}

export default Admin