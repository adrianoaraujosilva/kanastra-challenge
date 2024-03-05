import { LoadImportFiles } from "@/domain/usecases";

export const loadImportFileResponseSerializer = (
  params: LoadImportFiles.ApiResponse
): LoadImportFiles.Response => {
  const { result, ...rest } = params;
  const { data, links, total, current_page, last_page } = result;

  const meta = {
    current_page,
    total_page: total,
    last_page,
  };

  return {
    ...rest,
    data,
    links,
    meta,
  };
};
