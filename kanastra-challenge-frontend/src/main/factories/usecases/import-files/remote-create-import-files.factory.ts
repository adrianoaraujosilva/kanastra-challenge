import { makeAxiosHttpClient } from "@/main/factories/http";
import { RemoteCreateImportFiles } from "@/application/usecases";

// TODO - implementar função de mock
export const makeRemoteCreateImportFiles = () => {
  return new RemoteCreateImportFiles("/boletos/upload", makeAxiosHttpClient());
};
