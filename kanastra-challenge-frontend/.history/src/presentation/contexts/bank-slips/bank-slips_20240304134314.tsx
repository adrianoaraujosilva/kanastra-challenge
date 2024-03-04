import {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { BankSlipProps } from "@/domain/protocols";
import { LoadBankSlips } from "@/domain/usecases";

enum BankSlipActionType {}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type BankSlipContextState = {
  isLoading: boolean;
  // bankSlips: LoadBankSlips.Response;
  // file: File | null;
  // fileList: File[]; // & {} You can add more information about the challenge inside this type
};

type BankSlipAction = ReducerAction<
  BankSlipActionType,
  Partial<BankSlipContextState>
>;

type BankSlipDispatch = ({ type, payload }: BankSlipAction) => void;

type BankSlipContextType = {
  state: BankSlipContextState;
  dispatch: BankSlipDispatch;
  bankSlip: LoadBankSlips.Response;
};

type BankSlipProviderProps = PropsWithChildren & BankSlipProps; // & {};

export const BankSlipContextInitialValues: Partial<BankSlipContextState> = {
  isLoading: false,
  // bankSlips: {} as LoadBankSlips.Response,
  // file: {} as File,
};

const BankSlipContext = createContext({} as BankSlipContextType);

const BankSlipReducer = (
  state: BankSlipContextState,
  action: BankSlipAction
): BankSlipContextState => {
  console.log("action:", action);

  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const BankSlipProvider = ({
  createBankSlips,
  loadBankSlips,
  children,
}: BankSlipProviderProps) => {
  const [bankSlips, setBankSlips] = useState({} as LoadBankSlips.Response);
  const [state, dispatch] = useReducer(
    BankSlipReducer,
    BankSlipContextInitialValues as BankSlipContextState
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

  console.log("BankSlipProvider", bankSlips);

  return (
    <BankSlipContext.Provider value={{ state, dispatch, loadBankSlips }}>
      {children}
    </BankSlipContext.Provider>
  );
};

export const useBankSlipsContext = () => {
  const context = useContext(BankSlipContext);

  if (context === undefined)
    throw new Error(
      "useBankSlipsContext must be used within a BankSlipProvider"
    );

  return context;
};
