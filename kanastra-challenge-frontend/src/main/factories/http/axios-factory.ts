import axios, { AxiosInstance } from 'axios';

export const makeAxios = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.VITE_APP_API_BASE_URL
  });
};
