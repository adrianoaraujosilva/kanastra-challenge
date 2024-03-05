import { PropsWithChildren } from "react";
import { FileProvider } from "@/presentation/contexts";
import {
  makeRemoteCreateBankSlips,
  makeRemoteCreateImportFiles,
  makeRemoteLoadBankSlips,
  makeRemoteLoadImportFiles,
} from "@/main/factories/usecases";

type ProvidersProps = PropsWithChildren;

function Providers({ children }: Readonly<ProvidersProps>) {
  const fileProps = {
    createBankSlips: makeRemoteCreateBankSlips(),
    loadBankSlips: makeRemoteLoadBankSlips(),
    createImportFiles: makeRemoteCreateImportFiles(),
    loadImportFiles: makeRemoteLoadImportFiles(),
  };

  return <FileProvider {...fileProps}>{children}</FileProvider>;
}

export default Providers;
