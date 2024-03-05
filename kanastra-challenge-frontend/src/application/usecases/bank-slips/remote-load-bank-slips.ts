import { LoadBankSlips } from "@/domain/usecases";
import { HttpClient, HttpStatusCodeEnum } from "@/application/protocols";
import { loadBankSlipResponseSerializer } from "@/infra/serializers";
import {
  AccessDeniedError,
  BadRequestError,
  UnexpectedError,
} from "@/domain/errors";

export class RemoteLoadBankSlips implements LoadBankSlips {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadBankSlips.ApiResponse>
  ) {}

  async load({
    page,
  }: RemoteLoadBankSlips.Params): Promise<RemoteLoadBankSlips.Response> {
    const queryParams = new URLSearchParams({ page: String(page) });
    const url = `${this.url}?${queryParams.toString()}`;

    const httpResponse = await this.httpClient.request({
      method: "get",
      url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return loadBankSlipResponseSerializer(
          httpResponse.body as RemoteLoadBankSlips.ApiResponse
        );
      case HttpStatusCodeEnum.noContent:
        return {} as RemoteLoadBankSlips.Response;
      case HttpStatusCodeEnum.badRequest:
        throw new BadRequestError();
      case HttpStatusCodeEnum.unauthorized:
        throw new AccessDeniedError();
      case HttpStatusCodeEnum.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCodeEnum.unprocessableEntity:
        return {} as RemoteLoadBankSlips.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteLoadBankSlips {
  export type Params = LoadBankSlips.Params;
  export type ApiResponse = LoadBankSlips.ApiResponse;
  export type Response = LoadBankSlips.Response;
}
