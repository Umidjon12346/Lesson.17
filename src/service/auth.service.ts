import { _ButtonColorTypes } from "antd/es/button";
import { apiConfig } from "../api/config";
import { ApiUrls } from "../api/api-urls";
import type { SignIn } from "../types/auth";


export const authService ={
    async signIn(body:SignIn){
        const res = await apiConfig().postRequest(ApiUrls.ADMIN_AUTH_LOGIN,body)
        return res
    }
}