import axios from "axios";
import React, { useContext , useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import Loading from "../Components/Loading";
import { UserContext } from "../Context/UserContext";
import WishButton from "../Components/WishButton";
import { WishListContext } from "../Context/WishContext";

export default function RelatedProducts({category}) {
  //import Context
  let { addToCart } = useContext(cartContext);
  let { userToken } = useContext(UserContext);
  let { wishlist } = useContext(WishListContext);

  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  //React Query
  let { isLoading, data } = useQuery("featuredProducts", getProducts);

  //to get all products
  function getProducts() {
    return axios.get(`${BaseUrl}/api/v1/products`);
  }

  //to add product to cart
  async function addProduct(id) {
    await addToCart(id);
    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully added to cart
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x text-success">
              <i class="fa-solid fa-cart-plus"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    } else {
      toast.error(
        <div className="text-center">
          There is an error with your product add, Please try again later
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x text-primary">
              <i class="fa-solid fa-circle-exclamation"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    }
  }

  //to disable "Add to Cart button"
  async function addProductLocked() {
    toast(
      <div className="text-center">
        Please login first to add the product to cart
      </div>,
      {
        duration: 5000,
        icon: (
          <div className="fa-2x text-warning">
            <i class="fa-solid fa-right-to-bracket"></i>
          </div>
        ),
        position: "top-center",
      }
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Slider settings
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-area my-4 ">
      <div className="container">
      <h2 className="main-title my-4 text-center">Related Products</h2>

        <div className="jump">
          <div>
            {!isLoading ? (
              <div className="row p-1">
                <Slider {...settings} className="my-2 ">
                  {data?.data.data
                    .filter(
                      (product) => product.category["name"] === `${category}`
                    )
                    // .slice(0, 4)

                    .map((product) => {
                      return (
                        <div
                          key={product.id}
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                        >
                          <div className="single-product-wrap rounded-4 m-1">
                            <div className="product-img product-img-zoom p-2">
                              <Link
                                to={`/onlineShopReactjs/productdetails/${product.id}`}
                                target="_top"
                              >
                                <img
                                  src={product.imageCover}
                                  className="w-100 rounded-3"
                                  alt={product.title}
                                />
                              </Link>

                              {userToken !== null ? (
                                <>
                                  <div className="wishlist-btn">
                                    <WishButton
                                      key={product.id}
                                      product={product}
                                      wishlist={wishlist}
                                    />
                                  </div>

                                  <div className="product-content-wrap-2 product-content-position text-center">
                                    <div className="pro-add-to-cart pb-1">
                                      <button
                                        onClick={() => addProduct(product._id)}
                                        title="Add to Cart"
                                      >
                                        Add To Cart
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="product-content-wrap-2 product-content-position text-center">
                                    <div className="locked-cart pb-1">
                                      <button
                                        onClick={addProductLocked}
                                        title="Add to Cart"
                                        aria-disabled
                                      >
                                        Add To Cart &nbsp;
                                        <i class="fa-solid fa-lock"></i>
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="product-content-wrap-2  text-center">
                              <div className="product-rating-wrap ">
                                <div className="product-rating">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star "></i>
                                </div>
                                <h3 className="m-1 rating">
                                  {product.ratingsAverage}
                                </h3>
                              </div>

                              <h5 className="my-1 name">
                                {product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join("  ")}
                              </h5>

                              <h6 className="my-1 category">
                                {product.category.name}
                              </h6>

                              <div className="my-1 price">
                                <h3 className="price">EGP{product.price}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
