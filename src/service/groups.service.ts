import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Group } from "../types/group";

export const GroupService = {
  async getGroups() {
    const res = await apiConfig().getRequest(ApiUrls.Groups);
    return res;
  },

  async createGroup(model:Group):Promise<any>{
    const res = await apiConfig().postRequest(ApiUrls.Groups,model)
    return res
  }
};
