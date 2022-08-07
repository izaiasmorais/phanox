import produce from "immer";
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductsProps } from "../types/types";
import toast from "react-hot-toast";

export interface CartItems extends ProductsProps {
  quantity: number;
}

interface StateContextProviderProps {
  children: ReactNode;
}

interface StateConextProps {
  showCart: boolean;
  cartItems: CartItems[];
  setCartItems: (value: CartItems[]) => void;
  setTotalPrice: (value: number) => void;
  setShowCart: (value: boolean) => void;
  onAdd: (product: CartItems) => void;
  onRemove: (index: number) => void;
  changeQuantity: (cartItemId: string, type: "inc" | "dec") => void;
  totalPrice: number;
}

export const StateContext = createContext({} as StateConextProps);

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function onAdd(product: CartItems) {
    const productAlreadyExists = cartItems.findIndex(
      (cartItem) => cartItem._id === product._id
    );

    const newCart = produce(cartItems, (draft) => {
      if (productAlreadyExists < 0) {
        draft.push(product);
      } else {
        draft[productAlreadyExists].quantity += product.quantity;
      }
    });

    setCartItems(newCart);
    setTotalPrice((previous) => previous + product.price * product.quantity);

    toast.success(`${product.quantity} ${product.name} added to cart`);
  }

  function onRemove(index: number) {
    const updatedCart = produce(cartItems, (draft) => {
      draft.splice(index, 1);
    });

    setCartItems(updatedCart);
    setTotalPrice(
      (previous) =>
        previous - cartItems[index].price * cartItems[index].quantity
    );
  }

  function changeQuantity(cartItemId: string, type: "inc" | "dec") {
    const newCart = produce(cartItems, (draft) => {
      const productAlreadyExists = cartItems.findIndex(
        (cartItem) => cartItem._id === cartItemId
      );

      if (productAlreadyExists >= 0) {
        const item = draft[productAlreadyExists];

        if (type === "inc") {
          item.quantity += 1;
        }

        if (type === "dec" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    });

    setCartItems(newCart);
  }

  return (
    <StateContext.Provider
      value={{
        cartItems,
        setCartItems,
        showCart,
        setShowCart,
        onAdd,
        onRemove,
        totalPrice,
        setTotalPrice,
        changeQuantity,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useCart() {
  return useContext(StateContext);
}
