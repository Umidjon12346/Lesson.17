import axiosInstance from ".";
import { Notification } from "../helpers/notification";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (error) {
      Notification("error", "asdasdasdasd");
    }
  }
  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      return res;
    } catch (error) {
        Notification("error", "asdasdasdasd");
    }
  }
  return {
    getRequest,
    postRequest,
  };
}
