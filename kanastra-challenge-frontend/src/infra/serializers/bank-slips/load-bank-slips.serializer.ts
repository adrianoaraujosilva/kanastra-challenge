import { LoadBankSlips } from "@/domain/usecases";

export const loadBankSlipResponseSerializer = (
  params: LoadBankSlips.ApiResponse
): LoadBankSlips.Response => {
  const { result, ...rest } = params;
  const { data, links, total, current_page, last_page } = result;

  const meta = {
    current_page,
    total_page: total,
    last_page: last_page,
  };

  return {
    ...rest,
    data,
    links,
    meta,
  };
};
