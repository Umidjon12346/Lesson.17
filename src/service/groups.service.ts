import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { AddGroupTeacher, Group } from "../types/group";

export const GroupService = {
  async getGroups(params: any) {
    const res = await apiConfig().getRequest(ApiUrls.Groups, params);
    return res;
  },

   getGroupById: async (id: number) => {
    const res = await apiConfig().getRequest(`${ApiUrls.Groups}/${id}`)
    return res
  },

  async getGroupStudents(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
    );
    return res;
  },
  async getGroupTeachers(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`
    );
    return res;
  },
  async getGroupLessons(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
    return res;
  },

  async createGroup(model: Group): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.Groups, model);
    return res;
  },

  // ...avvalgi metodlar

  async assignTeachersToGroup(payload: AddGroupTeacher) {
    const res = await apiConfig().postRequest(ApiUrls.GROUP_TEACHERS, payload);
    return res;
  },
  async assignStudentsToGroup(payload: AddGroupTeacher) {
    const res = await apiConfig().postRequest(ApiUrls.GROUP_STUDENTS, payload);
    return res;
  },

  async deleteGroup(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.Groups}/${id}`);
    return res;
  },

  async editGroup(id: number, model: Group) {
    const res = await apiConfig().putRequest(`${ApiUrls.Groups}/${id}`, model);
    return res;
  },
};
