import { CreateImportFiles, LoadImportFiles } from "@/domain/usecases";

export type ImportFileProps = {
  loadImporFiles: LoadImportFiles;
  createImporFiles: CreateImportFiles;
};
