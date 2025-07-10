import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Course } from "../types/course";

export const CourseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.Course);
    return res;
  },

  async createCourses(model: Course) {
    const res = await apiConfig().postRequest(ApiUrls.Course, model);
    return res;
  },

  async updateCourses(model: Course, id: number): Promise<any> {
    const res = await apiConfig().putRequest(`${ApiUrls.Course}/${id}`, model);
    return res;
  },

  async deleteCourses(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.Course}/${id}`);
    return res;
  },
};
