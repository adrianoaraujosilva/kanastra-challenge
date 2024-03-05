import { ServiceResponse } from "@/domain/usecases";

export interface LoadImportFiles {
  load: (params: LoadImportFiles.Params) => Promise<LoadImportFiles.Response>;
}

export namespace LoadImportFiles {
  export type Params = {
    page: number;
  };

  export type Data = {
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

  export type Link = {
    url: string;
    label: string;
    active: boolean;
  };

  export type Result = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
    data: Data[];
    links: Link[];
  };

  export type ApiResponse = ServiceResponse<Result>;

  export type Meta = {
    current_page: number;
    total_page: number;
    last_page: number;
  };

  export type Response = {
    success: boolean;
    message: string;
    data: Data[];
    links: Link[];
    meta: Meta;
  };
}
