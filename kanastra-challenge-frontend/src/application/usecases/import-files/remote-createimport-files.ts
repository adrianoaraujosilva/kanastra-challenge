import { CreateImportFiles } from "@/domain/usecases";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCodeEnum } from "@/application/protocols";

export class RemoteCreateImportFiles implements CreateImportFiles {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateImportFiles.ApiResponse>
  ) {}
  async create(
    body: RemoteCreateImportFiles.Params
  ): Promise<RemoteCreateImportFiles.Response> {
    const httpResponse = await this.httpClient.request({
      method: "post",
      url: this.url,
      body: body,
    });

    // TODO - fazer o serializer do body
    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body as RemoteCreateImportFiles.Response;
      case HttpStatusCodeEnum.created:
        return httpResponse.body as RemoteCreateImportFiles.Response;
      case HttpStatusCodeEnum.noContent:
        return {} as RemoteCreateImportFiles.Response;
      case HttpStatusCodeEnum.unprocessableEntity:
        return httpResponse.body as RemoteCreateImportFiles.Response;
      case HttpStatusCodeEnum.unauthorized:
      case HttpStatusCodeEnum.badRequest:
      case HttpStatusCodeEnum.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteCreateImportFiles {
  export type Params = CreateImportFiles.Params;
  export type ApiResponse = CreateImportFiles.ApiResponse;
  export type Response = CreateImportFiles.Response;
}
