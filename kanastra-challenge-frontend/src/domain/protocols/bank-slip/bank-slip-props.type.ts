import { CreateBankSlips, LoadBankSlips } from "@/domain/usecases";

export type BankSlipProps = {
  loadBankSlips: LoadBankSlips;
  createBankSlips: CreateBankSlips;
};
