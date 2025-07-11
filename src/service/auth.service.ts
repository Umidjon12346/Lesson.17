import { _ButtonColorTypes } from "antd/es/button";
import { apiConfig } from "../api/config";
import { ApiUrls } from "../api/api-urls";
import type { SignIn } from "../types/auth";


export const authService ={
    async signIn(body:SignIn,role:string){
        const res = await apiConfig().postRequest(`/${role}-auth${ApiUrls.LOGIN}`,body)
        return res
    }
}