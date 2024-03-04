import { LoadImportFiles } from "@/domain/usecases";
import { HttpClient, HttpStatusCodeEnum } from "@/application/protocols";
import { loadImportFileResponseSerializer } from "@/infra/serializers";
import {
  AccessDeniedError,
  BadRequestError,
  UnexpectedError,
} from "@/domain/errors";

export class RemoteLoadImportFiles implements LoadImportFiles {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadImportFiles.ApiResponse>
  ) {}

  async load({
    page,
  }: RemoteLoadImportFiles.Params): Promise<RemoteLoadImportFiles.Response> {
    const queryParams = new URLSearchParams({ page: String(page) });
    const url = `${this.url}?${queryParams.toString()}`;

    const httpResponse = await this.httpClient.request({
      method: "get",
      url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return loadImportFileResponseSerializer(
          httpResponse.body as RemoteLoadImportFiles.ApiResponse
        );
      case HttpStatusCodeEnum.noContent:
        return {} as RemoteLoadImportFiles.Response;
      case HttpStatusCodeEnum.badRequest:
        throw new BadRequestError();
      case HttpStatusCodeEnum.unauthorized:
        throw new AccessDeniedError();
      case HttpStatusCodeEnum.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCodeEnum.unprocessableEntity:
        return {} as RemoteLoadImportFiles.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteLoadImportFiles {
  export type Params = LoadImportFiles.Params;
  export type ApiResponse = LoadImportFiles.ApiResponse;
  export type Response = LoadImportFiles.Response;
}
