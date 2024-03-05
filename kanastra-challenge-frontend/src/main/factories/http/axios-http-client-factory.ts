import { AxiosHttpClient } from '@/infra/http';
import { makeAxios } from '@/main/factories/http';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient(makeAxios());
};
