import { ServiceResponse } from "@/domain/usecases";

export interface CreateBankSlips {
  create: (params: CreateBankSlips.Params) => Promise<CreateBankSlips.Response>;
}

export namespace CreateBankSlips {
  export type Params = FormData;

  // TODO - Implementar tipagem no result
  export type Result = object;

  export type ApiResponse = ServiceResponse<Result>;

  // TODO - Implementar tipagem de como voce vai serializar
  export type Response = object;
}
