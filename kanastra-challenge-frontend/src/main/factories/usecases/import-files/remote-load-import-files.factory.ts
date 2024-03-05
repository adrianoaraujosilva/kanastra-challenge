import { MOCK_MODE } from "@/config/vars.ts";
import {
  RemoteLoadImportFiles,
  RemoteLoadImportFilesMocked,
} from "@/application/usecases";
import { makeAxiosHttpClient } from "@/main/factories/http";
import { LoadImportFiles } from "@/domain/usecases";

export const makeRemoteLoadImportFiles = (): LoadImportFiles => {
  return MOCK_MODE
    ? new RemoteLoadImportFilesMocked()
    : new RemoteLoadImportFiles("/boletos/upload", makeAxiosHttpClient());
};
