import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Branch } from "../types/branch";

export const BranchService = {
  async getBranches(params:any) {
    const res = await apiConfig().getRequest(ApiUrls.BRANCH,params);
    return res;
  },
  async createBranch(model: Branch) {
    const res = await apiConfig().postRequest(ApiUrls.BRANCH, model);
    return res;
  },
  async updateBranch(model: Branch, id: number): Promise<any> {
    const res = await apiConfig().putRequest(
      `${ApiUrls.BRANCH}/${id}`,
      model
    );
    return res;
  },
  async deleteBranch(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCH}/${id}`);
    return res;
  },
};
