import React from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import MainSlider from "../Components/MainSlider";
import BrandSlider from "../Components/BrandSlider";
import { Helmet } from "react-helmet";
import BlackFriday from "../../src/Assets/images/black-friday.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Online shop</title>
      </Helmet>

      <MainSlider />


      <FeaturedProducts />

      <Link to="/onlineShopReactjs/products/page-1">
        <div className="container-fluid mt-5 mb-5 ">
          <div className="container  ">
            <img className="w-100 " src={BlackFriday} alt="Free Returns" />
          </div>
        </div>
      </Link>

      <BrandSlider />
    </>
  );
}
