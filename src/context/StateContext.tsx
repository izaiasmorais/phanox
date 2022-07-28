import produce from "immer";
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductsProps, CartProductsProps } from "../types/types";
import toast from "react-hot-toast";

interface StateContextProviderProps {
  children: ReactNode;
}

interface StateConextProps {
  cartItems: CartProductsProps[];
  qty: number;
  totalQty: number;

  decQty: () => void;
  incQty: () => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;

  totalPrice: number;

  onAdd: (product: ProductsProps, quantity: number) => void;
}

export const StateContext = createContext({} as StateConextProps);

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartProductsProps[]>([]);
  const [totalQty, setTotalQty] = useState(0);
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

  function onAdd(product: ProductsProps, quantity: number) {
    const productAlreadyExist = cartItems.findIndex(
      (cartItem) => cartItem._id === product._id
    );

    setTotalPrice((previous) => previous + quantity * product.price);

    if (productAlreadyExist < 0) {
      setTotalQty((previous) => previous + 1);

      setCartItems([...cartItems, { ...product, quantity }]);
    } else {
      const newCart = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });

      setCartItems(newCart);

      console.log(cartItems);
    }

    toast.success(`${qty} ${product.name} adicionado`);
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
