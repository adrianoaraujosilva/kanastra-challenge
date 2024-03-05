import { LoadBankSlips } from "@/domain/usecases";
import { loadBankSlipResponseSerializer } from "@/infra/serializers";
import { LoadBankSlipsSuccessResponse } from "@/application/usecases/__mocks__";
export class RemoteLoadBankSlipsMocked implements LoadBankSlips {
  async load(): Promise<RemoteLoadBankSlipsMocked.Response> {
    return loadBankSlipResponseSerializer(
      LoadBankSlipsSuccessResponse as unknown as RemoteLoadBankSlipsMocked.ApiResponse
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteLoadBankSlipsMocked {
  export type ApiResponse = LoadBankSlips.ApiResponse;
  export type Response = LoadBankSlips.Response;
}
