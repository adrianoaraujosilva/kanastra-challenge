import { HttpStatusCodeEnum } from '@/application/protocols/http/http-status-code.enum';

export type HttpResponse<BodyData = any> = {
  statusCode: HttpStatusCodeEnum | undefined;
  body?: BodyData;
};
