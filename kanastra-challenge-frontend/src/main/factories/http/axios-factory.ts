import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "@/config/vars.ts";

export const makeAxios = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.VITE_APP_API_BASE_URL,
  });
};
