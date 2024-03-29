import {CreateBankSlips, LoadBankSlips} from "@/domain/usecases";

export type DashboardProps = {
  loadBankSlips: LoadBankSlips;
  createBankSlips: CreateBankSlips;
}
