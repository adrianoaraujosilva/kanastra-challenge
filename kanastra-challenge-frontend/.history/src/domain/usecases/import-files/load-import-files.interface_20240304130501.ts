import {ServiceResponse} from "@/domain/usecases";

export interface LoadBankSlips {
  load: (params: LoadBankSlips.Params) => Promise<LoadBankSlips.Response>
}

export namespace LoadBankSlips {
  export type Params = {
    page: number
  }

  export type Data = {
    debt_id: string,
    name: string,
    government_id: number,
    email: string,
    debtAmount: string,
    debtDueDate: string,
    isPaid: boolean,
    created_at: string,
    updated_at: string
  }

  export type Link = {
    url: string,
    label: string,
    active: boolean
  }

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
    links: Link[]
  }

  export type ApiResponse = ServiceResponse<Result>

  export type Meta = {
    current_page: number;
    total_page: number;
  }

  export type Response = {
    success: boolean;
    message: string;
    data: Data[];
    links: Link[];
    meta: Meta;
  }
}
