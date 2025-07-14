import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Group } from "../types/group";

export const GroupService = {
  async getGroups(params:any) {
    const res = await apiConfig().getRequest(ApiUrls.Groups,params);
    return res;
  },

  async createGroup(model:Group):Promise<any>{
    const res = await apiConfig().postRequest(ApiUrls.Groups,model)
    return res
  },

  async deleteGroup(id:number){
    const res = await apiConfig().deleteRequest(`${ApiUrls.Groups}/${id}`)
    return res
  },

  async editGroup(id:number,model:Group){
    const res = await apiConfig().putRequest(`${ApiUrls.Groups}/${id}`,model)
    return res
  }
};
