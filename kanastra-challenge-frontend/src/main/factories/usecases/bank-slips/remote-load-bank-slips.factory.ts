import {MOCK_MODE} from "@/config/vars.ts";
import {RemoteLoadBankSlips, RemoteLoadBankSlipsMocked} from "@/application/usecases";
import {makeAxiosHttpClient} from "@/main/factories/http";
import {LoadBankSlips} from "@/domain/usecases";

export const makeRemoteLoadBankSlips = (): LoadBankSlips => {
  return MOCK_MODE ?
    new RemoteLoadBankSlipsMocked() :
    new RemoteLoadBankSlips('/boletos', makeAxiosHttpClient());
}
