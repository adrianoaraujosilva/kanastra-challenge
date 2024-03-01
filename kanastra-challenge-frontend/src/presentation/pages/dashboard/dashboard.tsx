import { DashboardProps } from "@/domain/protocols";
import { useEffect, useState } from "react";
import { LoadBankSlips } from "@/domain/usecases";

function DashboardComponent({ loadBankSlips }: DashboardProps) {
  const [bankSlips, setBankSlips] = useState({} as LoadBankSlips.Response);
  const getBankSlips = async () => {
    try {
      const response = await loadBankSlips.load({ page: 1 });
      setBankSlips(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBankSlips();
  }, []);

  console.log(bankSlips);

  return (
    // <FileProvider>
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default DashboardComponent;
