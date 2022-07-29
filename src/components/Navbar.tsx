import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useCart } from "../context/StateContext";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, cartItems } = useCart();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">PHANOX</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItems.length}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
