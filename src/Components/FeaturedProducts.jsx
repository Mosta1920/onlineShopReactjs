import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../Components/Loading";
import { WishListContext } from "../Context/WishContext";
import Product from "../Components/Product";

export default function FeaturedProducts() {
  //import Context
  let { setWishlist } =
    useContext(WishListContext);

  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  //React Query
  let { isLoading, data } = useQuery("featuredProducts", getProducts);

  //to get all products
  function getProducts() {
    return axios.get(`${BaseUrl}/api/v1/products`);
  }

  //to save id of products in localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  return (
    <>
      <section className="product-area mt-5">
        <div className="container">
          <h2 className="main-title my-4">Our Featured Products</h2>

          <div className="tab-content jump ">
            <div>
              {!isLoading ? (
                <div className="row g-3">
                  {data?.data.data
                    .filter(
                      (product) => product.category["name"] === "Electronics"
                    )
                    .slice(0, 4)
                    .map((product) => {
                      return (
                        <Product product={product} />
                      );
                    })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
