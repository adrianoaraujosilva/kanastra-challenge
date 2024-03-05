import { ServiceResponse } from "@/domain/usecases";

export interface CreateImportFiles {
  create: (
    params: CreateImportFiles.Params
  ) => Promise<CreateImportFiles.Response>;
}
export namespace CreateImportFiles {
  export type Params = FormData;

  export type Result = {
    id: string;
    name: string;
    type: number;
    size: string;
    process_time: string;
    status: string;
    name_temp: boolean;
    created_at: string;
    updated_at: string;
  };

  export type Data = {
    file: Array<string>;
  };

  export type ApiResponse = ServiceResponse<Result>;

  export type Response = {
    success: boolean;
    message: string;
    result: Result;
    data: Data;
  };
}
