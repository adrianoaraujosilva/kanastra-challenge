import {DashboardTag} from "@/presentation/pages";
import {makeRemoteCreateBankSlips, makeRemoteLoadBankSlips} from "@/main/factories/usecases";

export const makeDashboard = () => {
  const dashboardProps = {
    createBankSlips: makeRemoteCreateBankSlips(),
    loadBankSlips: makeRemoteLoadBankSlips()
  }

  return <DashboardTag {...dashboardProps}  />
}
