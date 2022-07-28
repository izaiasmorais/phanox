import { createContext, ReactNode, useState } from "react";

import { ProductsProps } from "../types/types";

interface StateConextProps {
  cartItems: ProductsProps[];
  qty: number;
}

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContext = createContext({} as StateConextProps);

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [cartItems, setCartItens] = useState<ProductsProps[]>([]);
  const [qty, setQty] = useState(0);

  return (
    <StateContext.Provider value={{ cartItems, qty }}>
      {children}
    </StateContext.Provider>
  );
}
