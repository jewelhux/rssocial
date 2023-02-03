import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = {
  isOpen: true | false,
  setisOpen: (key:boolean) =>{}
};

export const Context = createContext<Partial<ContextType>>()