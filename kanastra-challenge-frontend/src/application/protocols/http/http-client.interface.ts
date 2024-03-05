import { HttpRequestParams } from '@/application/protocols/http/http-request-params.type';
import { HttpResponse } from '@/application/protocols/http/http-response.type';

export interface HttpClient<ResponseData = any> {
  request: (params: HttpRequestParams) => Promise<HttpResponse<ResponseData>>;
}
