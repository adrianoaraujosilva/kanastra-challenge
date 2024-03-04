import {
  HttpClient,
  HttpRequestParams,
  HttpResponse,
  HttpStatusCodeEnum
} from '@/application/protocols/http';

export class HttpClientSpy<ResponseType = any>
  implements HttpClient<ResponseType>
{
  constructor(private readonly body?: ResponseType){}

  url = '';
  headers?: any;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCodeEnum.ok,
  };

  async request(
    params: HttpRequestParams
  ): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.headers = params.headers;

    this.response.body = this.body ?? {} as ResponseType

    return this.response;
  }
}
