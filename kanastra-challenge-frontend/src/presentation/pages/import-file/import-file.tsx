import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components";
import { useFileContext } from "@/presentation/contexts";
import Paginate from "@/presentation/layout/components/pagination/pagination";
import { ReactElement } from "react";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";

function ImportFileComponent(): ReactElement {
  const {
    importFiles,
    page,
    files,
    onChangeFile,
    handleChangePage,
    submitFile,
  } = useFileContext();

  if (!Object.entries(importFiles).length) return null;

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <h1>Arquivos</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div>
          <Dropzone
            onChange={onChangeFile}
            value={files}
            localization="PT-pt"
            maxFiles={1}
            footer={false}
          >
            {Array.isArray(files) &&
              files.map((file, index) => (
                <FileMosaic key={index} {...file} preview />
              ))}
          </Dropzone>
        </div>
        <div className="ml-5">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitFile}
          >
            Enviar
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Import Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Process Time</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {importFiles.data.map((importFile) => (
              <TableRow key={importFile.id}>
                <TableCell>{importFile.id}</TableCell>
                <TableCell>{importFile.name}</TableCell>
                <TableCell>{importFile.type}</TableCell>
                <TableCell>{importFile.process_time}</TableCell>
                <TableCell>{importFile.size}</TableCell>
                <TableCell>{importFile.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-center items-center p-5">
        <Paginate
          count={importFiles.meta.last_page}
          page={page}
          onChange={handleChangePage}
        ></Paginate>
      </div>
    </>
  );
}

export default ImportFileComponent;
