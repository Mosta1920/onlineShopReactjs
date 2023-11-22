import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet";
import { WishListContext } from "../Context/WishContext";
import Pagination from "../Components/Pagination";
import Product from "../Components/Product";

export default function Products() {
  //import Context
  let { setWishlist } = useContext(WishListContext);

  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  //React Query
  let { isLoading, data } = useQuery("featuredProducts", getProducts);

  //to get all products
  function getProducts() {
    return axios.get(`${BaseUrl}/api/v1/products`);
  }

  //to check id of products in localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Products - Online shop</title>
      </Helmet>

      <section className="product-area py-3">
        <div className="container">
          <div className="tab-btn-wrap my-4 ">
            <div className="tab-style-2 nav h5">
              <Link className="active" to="#product-1" data-bs-toggle="tab">
                All Products
              </Link>

              <Link to="#product-2" data-bs-toggle="tab">
                Men's Fashion
              </Link>
              <Link to="#product-3" data-bs-toggle="tab">
                Women's Fashion
              </Link>

              <Link to="#product-7" data-bs-toggle="tab">
                Electronics
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          {/*All Products*/}

          <div className="tab-content jump">
            <div id="product-1" className="tab-pane active">
              {!isLoading ? (
                <div className="row g-3">
                  {data?.data.data.map((product) => {
                    return <Product product={product} />;
                  })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <div className="tab-content jump">
            <div id="product-2" className="tab-pane">
              {!isLoading ? (
                <div className="row g-3">
                  {data?.data.data
                    .filter(
                      (product) => product.category["name"] === "Men's Fashion"
                    )
                    .map((product) => {
                      return <Product product={product} />;
                    })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <div className="tab-content jump ">
            <div id="product-3" className="tab-pane">
              {!isLoading ? (
                <div className="row g-3">
                  {data?.data.data
                    .filter(
                      (product) =>
                        product.category["name"] === "Women's Fashion"
                    )
                    .map((product) => {
                      return <Product product={product} />;
                    })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <div className="tab-content jump ">
            <div id="product-7" className="tab-pane">
              {!isLoading ? (
                <div className="row g-3">
                  {data?.data.data
                    .filter(
                      (product) => product.category["name"] === "Electronics"
                    )
                    .map((product) => {
                      return <Product product={product} />;
                    })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </section>

      <Pagination />
    </>
  );
}
