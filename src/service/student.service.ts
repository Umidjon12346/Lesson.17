import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Student } from "../types/student";
import type { ParamType } from "../types/general";

export const StudentService = {
  async getStudents(params:ParamType) {
    const res = await apiConfig().getRequest(ApiUrls.STUDENT,params);
    return res;
  },

  async createStudent(model: Student) {
    const res = await apiConfig().postRequest(ApiUrls.STUDENT, model);
    return res;
  },

  async updateStudent(model: Student, id: number): Promise<any> {
    const res = await apiConfig().putRequest(
      `${ApiUrls.STUDENT}/${id}`,
      model
    );
    return res;
  },
  async deleteStudent(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENT}/${id}`);
    return res;
  },
};
