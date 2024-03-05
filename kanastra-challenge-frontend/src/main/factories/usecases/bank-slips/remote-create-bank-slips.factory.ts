import {makeAxiosHttpClient} from "@/main/factories/http";
import {RemoteCreateBankSlips} from "@/application/usecases";

// TODO - implementar função de mock
export const makeRemoteCreateBankSlips = () => {
  return new RemoteCreateBankSlips('/boletos', makeAxiosHttpClient());
}
