import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Teacher } from "../types/teacher";

export const TeacherService = {
  async getTeacher(params:any) {
    const res = await apiConfig().getRequest(ApiUrls.Teacher, params);
    return res;
  },

  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.Teacher, model);
    return res;
  },

  async updateTeacher(model: Teacher, id: number): Promise<any> {
    const res = await apiConfig().putRequest(`${ApiUrls.Teacher}/${id}`, model);
    return res;
  },
  async deleteTeacher(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.Teacher}/${id}`);
    return res;
  },
};