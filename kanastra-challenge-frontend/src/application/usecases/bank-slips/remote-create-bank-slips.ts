import {CreateBankSlips} from "@/domain/usecases";
import {AccessDeniedError, UnexpectedError} from "@/domain/errors";
import {HttpClient, HttpStatusCodeEnum} from "@/application/protocols";

export class RemoteCreateBankSlips implements CreateBankSlips {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      RemoteCreateBankSlips.ApiResponse[]
    >
  ) {}
  async create(body: RemoteCreateBankSlips.Params): Promise<RemoteCreateBankSlips.Response> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: body
    });

    // TODO - fazer o serializer do body
    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body as RemoteCreateBankSlips.Response;
      case HttpStatusCodeEnum.created:
        return httpResponse.body as RemoteCreateBankSlips.Response;
      case HttpStatusCodeEnum.noContent:
        return {} as RemoteCreateBankSlips.Response;
      case HttpStatusCodeEnum.unauthorized:
      case HttpStatusCodeEnum.badRequest:
      case HttpStatusCodeEnum.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }

  }

}

export namespace RemoteCreateBankSlips {
  export type Params = CreateBankSlips.Params;
  export type ApiResponse = CreateBankSlips.ApiResponse;
  export type Response = CreateBankSlips.Response;
}
