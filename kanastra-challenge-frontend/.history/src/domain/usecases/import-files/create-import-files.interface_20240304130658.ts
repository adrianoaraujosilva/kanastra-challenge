import { ServiceResponse } from "@/domain/usecases";

export interface CreateImportFiles {
  create: (
    params: CreateImportFiles.Params
  ) => Promise<CreateImportFiles.Response>;
}

export namespace CreateImportFiles {
  export type Params = FormData;

  // TODO - Implementar tipagem no result
  export type Result = {};

  export type ApiResponse = ServiceResponse<Result>;

  // TODO - Implementar tipagem de como voce vai serializar
  export type Response = {};
}
