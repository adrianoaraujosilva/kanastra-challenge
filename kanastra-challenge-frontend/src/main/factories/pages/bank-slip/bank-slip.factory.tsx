import { BankSlipTag } from "@/presentation/pages";
import {
  makeRemoteCreateBankSlips,
  makeRemoteLoadBankSlips,
} from "@/main/factories/usecases";

export const makeBankSlip = () => {
  const bankSlipProps = {
    createBankSlips: makeRemoteCreateBankSlips(),
    loadBankSlips: makeRemoteLoadBankSlips(),
  };

  return <BankSlipTag {...bankSlipProps} />;
};
