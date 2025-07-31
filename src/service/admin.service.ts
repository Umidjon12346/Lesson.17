import { apiConfig } from "../api/config"

export const adminService ={
    async adminProfile(){
        const res = await apiConfig().getRequest(`admin/profile`)
        return res
    }
}