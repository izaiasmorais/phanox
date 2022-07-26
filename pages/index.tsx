import Link from "next/link";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
import { ProductsProps } from "../types/types";

interface HomeProps {
  products: ProductsProps[];
  bannerData: any;
}

export default function Home({ products, bannerData }: HomeProps) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
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
