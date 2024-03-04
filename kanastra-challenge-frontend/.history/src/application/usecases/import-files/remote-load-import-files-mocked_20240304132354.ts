import { LoadImportFiles } from "@/domain/usecases";
import { loadImportFileResponseSerializer } from "@/infra/serializers";
import { LoadImportFilesSuccessResponse } from "@/application/usecases/__mocks__";
export class RemoteLoadImportFilesMocked implements LoadImportFiles {
  async load(): Promise<RemoteLoadImportFilesMocked.Response> {
    return loadImportFileResponseSerializer(
      LoadImportFilesSuccessResponse as RemoteLoadImportFilesMocked.ApiResponse
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteLoadImportFilesMocked {
  export type ApiResponse = LoadImportFiles.ApiResponse;
  export type Response = LoadImportFiles.Response;
}
