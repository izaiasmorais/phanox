import produce from "immer";
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductsProps, onAddProps } from "../types/types";

interface StateContextProviderProps {
  children: ReactNode;
}

interface StateConextProps {
  cartItems: ProductsProps[];
  qty: number;
  totalQty: number;

  decQty: () => void;
  incQty: () => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;

  totalPrice: number;

  onAdd: ({ product, qty }: onAddProps) => void;
}

export const StateContext = createContext({} as StateConextProps);

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItens] = useState<ProductsProps[]>([]);
  const [totalQty, setTotalQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);

  function decQty() {
    if (qty <= 1) {
      return;
    }

    setQty((state) => state - 1);
  }

  function incQty() {
    setQty((state) => state + 1);
  }

  function onAdd({ product, qty }: onAddProps) {
    const productAlreadyExist = cartItems.findIndex(
      (cartItem) => cartItem._id === product._id
    );

    const newCart = produce(cartItems, (draft) => {
      if (productAlreadyExist) {
        
      }
    })
  }

  return (
    <StateContext.Provider
      value={{
        cartItems,
        qty,
        decQty,
        incQty,
        showCart,
        setShowCart,
        totalQty,
        totalPrice,
        onAdd,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useCart() {
  return useContext(StateContext);
}
