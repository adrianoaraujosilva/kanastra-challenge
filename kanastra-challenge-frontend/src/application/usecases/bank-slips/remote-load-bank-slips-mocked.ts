import {LoadBankSlips} from "@/domain/usecases";
import {loadBankSlipResponseSerializer} from "@/infra/serializers/bank-slips";
import LoadBankSlipsSuccessResponse from "@/application/usecases/__mocks__/load-bank-slips-response.json";
export class RemoteLoadBankSlipsMocked implements LoadBankSlips {

  async load(): Promise<RemoteLoadBankSlipsMocked.Response> {
        return loadBankSlipResponseSerializer(LoadBankSlipsSuccessResponse as RemoteLoadBankSlipsMocked.ApiResponse);
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteLoadBankSlipsMocked {
  export type ApiResponse = LoadBankSlips.ApiResponse;
  export type Response = LoadBankSlips.Response;
}
