import { ProductsProps } from "../types/types";
import { urlFor } from "../lib/client";
import Link from "next/link";

interface ProductProps {
  product: ProductsProps;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={String(urlFor(product.image && product.image[0]))}
            className="product-image"
            alt={product.name}
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
