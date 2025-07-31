import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Teacher } from "../types/teacher";

export const TeacherService = {
  async getTeacher(params: any) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER, params);
    return res;
  },

  async getTeacherGroups() {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS}/my-groups`);
    return res;
  },
  async getTeacherGroupById(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.TEACHER_GROUPS}/${id}/teacher`
    );
    return res;
  },

  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },

  async updateTeacher(model: Teacher, id: number): Promise<any> {
    const res = await apiConfig().putRequest(`${ApiUrls.TEACHER}/${id}`, model);
    return res;
  },
  async deleteTeacher(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },
};
