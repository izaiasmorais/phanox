
import Link from "next/link";
import { urlFor } from "../lib/client";
import { bannerData } from "../types/types";

interface HeroBannerProps {
  heroBanner: bannerData;
}

const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={String(urlFor(heroBanner.image))}
          alt={heroBanner.product}
          className="hero-banner-image"
          width={450}
          height={450}
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
