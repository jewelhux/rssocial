import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = {
  isOpenUsers: boolean,
  setisOpenUsers: Dispatch<SetStateAction<boolean>>
};

export const Context = createContext<ContextType>({} as ContextType)