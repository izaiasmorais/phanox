import Link from "next/link";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
import { bannerData, ProductsProps } from "../types/types";

interface HomeProps {
  products: ProductsProps[];
  bannerData: bannerData[];
}

export default function Home({ products, bannerData }: HomeProps) {
  return (
    <>
      <HeroBanner heroBanner={bannerData && bannerData[1]} />
      <div className="products-heading">
        <h2>Produtos mais vendidos</h2>
        <p>Alto-falantes de muitas variações</p>
      </div>
      <div className="products-container">
        {products.map((product) => {
          return (
            <Link
              key={product._id}
              href={`/product/${product.slug.current}`}
              passHref
            >
              <Product product={product} />
            </Link>
          );
        })}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
