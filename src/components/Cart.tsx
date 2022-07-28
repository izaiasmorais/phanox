import Link from "next/link";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { useCart } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQty, cartItems, setShowCart } = useCart();

  return (
    // @ts-ignore
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Seu carrinho</span>
          <span className="cart-num-items">({totalQty} itens)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Seu carrinho está vazio</h3>
            <Link href="/" passHref>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continuar comprando
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item, i) => (
              <div key={item._id} className="product">
                <img src={String(urlFor(item.image[0]))} alt={item.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
