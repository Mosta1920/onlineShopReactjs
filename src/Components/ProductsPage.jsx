import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Pagination from "../Components/Pagination";
import Product from "../Components/Product";

export default function ProductsPage() {
  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  //React Query
  let { isLoading, data } = useQuery("featuredProducts", getProducts);

  //to get all products
  function getProducts() {
    return axios.get(`${BaseUrl}/api/v1/products?page=2`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="product-area my-4 ">
      <div className="container">
        <div className="tab-btn-wrap my-4 ">
          <div className="tab-style-2 nav h5 ">
            <Link className="active" to="#product-1" data-bs-toggle="tab">
              All Products
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

      <Pagination />
    </section>
  );
}
