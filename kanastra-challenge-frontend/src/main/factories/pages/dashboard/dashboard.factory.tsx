import {DashboardTag} from "@/presentation/pages";
import {makeRemoteLoadBankSlips} from "@/main/factories/usecases";

export const makeDashboard = () => {
  return <DashboardTag loadBankSlips={makeRemoteLoadBankSlips()} />
}
