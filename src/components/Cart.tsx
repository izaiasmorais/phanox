import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useCart } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { getStripe } from "../lib/getStripe";
import { BeatLoader } from "react-spinners";

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, setShowCart, onRemove, changeQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  let sum = 0;

  for (let i = 0; i < cartItems.length; i++) {
    sum = sum + cartItems[i].price * cartItems[i].quantity;
  }

  async function handleCheckout() {
    setLoading(true);

    const stripe = await getStripe();

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe?.redirectToCheckout({ sessionId: data.id });
  }

  function outsideClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      setShowCart(false);
    }
  }

  return (
    <div
      className="cart-wrapper"
      // @ts-ignore
      ref={cartRef}
      onClick={(e) => outsideClick(e)}
    >
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({cartItems.length} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <Image src="/assets/shopping-bag.webp" width={250} height={250} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/" passHref>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => (
              <div className="product" key={item._id}>
                <img
                  // @ts-ignore
                  src={urlFor(item?.image[0])}
                  alt={item.name}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => changeQuantity(item._id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => changeQuantity(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(i)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>

              <h3>$ {sum}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                {loading ? (
                  <BeatLoader loading={loading} size={10} color="#fff" />
                ) : (
                  "Finalizar compra"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
