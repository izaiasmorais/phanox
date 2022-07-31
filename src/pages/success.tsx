import Link from "next/link";
import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useCart } from "../context/StateContext";
import { runFireWorks } from "../utils/utils";

export default function Success() {
  const { setCartItems, setTotalPrice } = useCart();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    runFireWorks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Verifique seu email para acessar o recibo.</p>
        <p className="description">
          Se tiver alguma dúvida, por favor envie um email para
          <a href="mailto:izaiaslima356@gmail.com" className="email">
            izaiaslima356@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continuar comprando
          </button>
        </Link>
      </div>
    </div>
  );
}
