import axiosInstance from ".";
import { Notification } from "../helpers/index";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      return res;
    } catch (error: any) {
      console.log("API Error:", error);
      Notification("error", error?.message);
    }
  }
  async function putRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.put(url, body);
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  async function deleteRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.put(url, {params});
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
  };

}
