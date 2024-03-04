import { LoadImportFiles } from "@/domain/usecases";

export const loadImportFileResponseSerializer = (
  params: LoadImportFiles.ApiResponse
): LoadImportFiles.Response => {
  const { result, ...rest } = params;
  const { data, links, total, current_page } = result;

  const meta = {
    current_page,
    total_page: total,
  };

  return {
    ...rest,
    data,
    links,
    meta,
  };
};
