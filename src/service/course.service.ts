import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";

export const CourseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.Course);
    return res;
  },
};