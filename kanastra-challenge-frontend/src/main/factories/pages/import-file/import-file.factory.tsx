import { ImportFileTag } from "@/presentation/pages";
import {
  makeRemoteCreateImportFiles,
  makeRemoteLoadImportFiles,
} from "@/main/factories/usecases";

export const makeImportFile = () => {
  const importFileProps = {
    createImportFiles: makeRemoteCreateImportFiles(),
    loadImportFiles: makeRemoteLoadImportFiles(),
  };

  return <ImportFileTag {...importFileProps} />;
};
