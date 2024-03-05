import {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  CreateBankSlips,
  LoadBankSlips,
  CreateImportFiles,
  LoadImportFiles,
} from "@/domain/usecases";
import { SelectChangeEvent } from "@mui/material";
import Swal from "sweetalert2";

enum FileActionType {}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  files: File[] | null;
};

type FileAction = ReducerAction<FileActionType, Partial<FileContextState>>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
  handleChangePage: (event: SelectChangeEvent, value: number) => void;
  onChangeFile: (incomingFiles: File[]) => void;
  submitFile: () => void;
  bankSlips: LoadBankSlips.Response;
  importFiles: LoadImportFiles.Response;
  files: File[];
  page: number;
};

type FileProviderProps = PropsWithChildren & {
  loadBankSlips: LoadBankSlips;
  createBankSlips: CreateBankSlips;
  loadImportFiles: LoadImportFiles;
  createImportFiles: CreateImportFiles;
};

export const FileContextInitialValues: Partial<FileContextState> = {
  files: [] as File[],
  isLoading: false,
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  _state: FileContextState,
  action: FileAction
): FileContextState => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({
  loadBankSlips,
  loadImportFiles,
  createImportFiles,
  children,
}: FileProviderProps) => {
  const [bankSlips, setBankSlips] = useState({} as LoadBankSlips.Response);
  const [importFiles, setImportFiles] = useState(
    {} as LoadImportFiles.Response
  );
  const [page, setPage] = useState(1);
  const [files, setFiles] = useState({} as File[]);

  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState
  );

  const handleChangePage = (event: SelectChangeEvent, value: number): void => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", value.toString());
    window.location.search = queryParams.toString();
  };

  const onChangeFile = (incomingFiles: File[]) => setFiles(incomingFiles);

  const submitFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", files[0].file);

      await createImportFiles
        .create(formData)
        .then((response: CreateImportFiles.Response) => {
          if (!response.success) {
            Swal.fire({
              icon: "error",
              title: response.message,
              text: response.data.file,
            });
          } else {
            setImportFiles({
              ...importFiles,
              data: [response.result, ...importFiles.data],
            });
            setFiles([]);

            Swal.fire({
              title: response.message,
              icon: "success",
            });
          }
        })
        .catch((e) => {
          console.log("erro", e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getBankSlips = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const page = Number(queryParams.get("page") ?? 1);
      setPage(page);
      const response = await loadBankSlips.load({ page });
      setBankSlips(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getImportFiles = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const page = Number(queryParams.get("page") ?? 1);
      setPage(page);
      const response = await loadImportFiles.load({ page });
      setImportFiles(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    Promise.all([getBankSlips(), getImportFiles()]);
  }, [window.location]);

  return (
    <FileContext.Provider
      value={{
        state,
        dispatch,
        bankSlips,
        importFiles,
        page,
        handleChangePage,
        onChangeFile,
        submitFile,
        files,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};
