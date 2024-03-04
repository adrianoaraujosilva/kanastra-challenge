import {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { DashboardProps } from "@/domain/protocols";
import { LoadBankSlips } from "@/domain/usecases";

enum FileActionType {}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[]; // & {} You can add more information about the challenge inside this type
};

type FileAction = ReducerAction<FileActionType, Partial<FileContextState>>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
  bankSlips: LoadBankSlips.Response;
};

type FileProviderProps = PropsWithChildren & DashboardProps; // & {};

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction
): FileContextState => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({
  createBankSlips,
  loadBankSlips,
  children,
}: FileProviderProps) => {
  const [bankSlips, setBankSlips] = useState({} as LoadBankSlips.Response);
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState
  );

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

  console.log("FileProvider", bankSlips);

  return (
    <FileContext.Provider value={{ state, dispatch, bankSlips }}>
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
