import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import toast from "react-hot-toast";
import RelatedProducts from "../Components//RelatedProducts";
import { UserContext } from "../Context/UserContext";
import WishButton from "../Components/WishButton";
import { WishListContext } from "../Context/WishContext";

import { cartContext } from "../Context/CartContext";

export default function ProductDetails() {
  //import Context
  let { addToCart } = useContext(cartContext);
  let { userToken } = useContext(UserContext);
  let { addToWishList, removeWish, wishlist, setWishlist } =
    useContext(WishListContext);
  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  //React Query
  let params = useParams();
  let { data } = useQuery("productdetails", () => getProductDetails(params.id));

  //to get product details
  function getProductDetails(id) {
    return axios.get(`${BaseUrl}/api/v1/products/${id}`);
  }

  //to add product to Wishlist
  async function addProductToWishList(productId) {
    await addToWishList(productId);
    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully added to Wishlist page
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x red">
              <i class="fas fa-heart fa-lg"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    } else {
      toast.error("Failed to add product to the wish list", {
        position: "top-right",
      });
    }
    const updatedWishlist = [...wishlist, productId];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  //to remove product from WishList
  async function removeWishItem(productId) {
    await removeWish(productId);
    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully removed from Wishlist page
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x text-success">
              <i class="fas fa-heart fa-lg"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    } else {
      toast.error("Failed to add product to the wish list", {
        position: "top-right",
      });
    }
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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

  //Slider settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fade: true,
    arrows: false,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-wrapper">
        {data?.data.data ? (
          <>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{data?.data.data.title} - Online shop</title>
            </Helmet>

            <div className="product-details-area mb-5 mt-2 pt-5 pb-5 jump about-row-white">
              <div className="container ">
                <div className="row ">
                  <div className="col-lg-6 col-md-6">
                    <div className="product-details-fixed-img ">
                      <span to="">
                        <Slider {...settings}>
                          {data?.data.data.images.map((img) => {
                            return (
                              <img
                                className="w-100 mb-3 rounded-5"
                                src={img}
                                alt={data?.data.data.title}
                              />
                            );
                          })}
                        </Slider>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="product-details-content pro-details-content-mrg">
                      <h1 className="black">{data?.data.data.title}</h1>
                      <div className="product-ratting-review-wrap">
                        <div className="product-ratting-digit-wrap">
                          <div className="product-ratting">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star "></i>
                          </div>
                          <div className="product-digit">
                            <h5 className="m-1">
                              {data?.data.data.ratingsAverage}
                            </h5>
                          </div>
                        </div>
                        <div className="product-review-order m-1">
                          <h5>
                            {data?.data.data.ratingsQuantity} Ratings Quantity
                          </h5>
                        </div>
                      </div>
                      <p className="black">{data?.data.data.description}</p>
                      <div className="pro-details-price">
                        <h2 className="new-price price">
                          EGP {data?.data.data.price}
                        </h2>
                      </div>

                      <div className="product-details-meta">
                        <ul>
                          <li>
                            <div className="name">
                              Categories:{" "}
                              <span className="black">
                                {data?.data.data.category.name}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="name">
                              Brand:{" "}
                              <span className="black">
                                {data?.data.data.brand.name}
                              </span>{" "}
                            </div>
                          </li>
                        </ul>
                      </div>

                      {userToken !== null ? (
                        <div className="row ">
                          <div className="add-to-cart text-center">
                            <button
                              className="col-8 col-lg-9 col-md-8 col-sm-8 "
                              onClick={() => addProduct(data?.data.data._id)}
                              title="Add to Cart"
                            >
                              Add To Cart
                            </button>

                            <WishButton
                              className="col-2 col-lg-3 col-md-2 col-sm-2"
                              key={data?.data.data.id}
                              product={data?.data.data}
                              wishlist={wishlist}
                              addProductToWishList={addProductToWishList}
                              removeWishItem={removeWishItem}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="col-12">
                            <div className="locked-cart">
                              <button
                                onClick={addProductLocked}
                                title="Add to Cart"
                              >
                                Add To Cart &nbsp;
                                <i class="fa-solid fa-lock"></i>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="description-review-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dec-review-topbar nav  my-5">
                <Link
                  className="active"
                  data-bs-toggle="tab"
                  to="#des-details1"
                >
                  Description
                </Link>
                <Link data-bs-toggle="tab" to="#des-details2">
                  Specification
                </Link>
              </div>
              <div className="tab-content dec-review-bottom">
                <div id="des-details1" className="tab-pane active">
                  <div className="description-wrap ">
                    <p>{data?.data.data.description}</p>
                  </div>
                </div>
                <div id="des-details2" className="tab-pane">
                  <div className="specification-wrap table-responsive">
                    <table>
                      <tbody>
                        <tr>
                          <td className="title width1">Name</td>
                          <td>{data?.data.data.title}</td>
                        </tr>

                        <tr>
                          <td className="title width1">Quantity</td>
                          <td>{data?.data.data.quantity}</td>
                        </tr>
                        <tr>
                          <td className="title width1">Sold</td>
                          <td>{data?.data.data.sold}</td>
                        </tr>
                        <tr>
                          <td className="title width1">Category</td>
                          <td>{data?.data.data.category.name}</td>
                        </tr>
                        <tr>
                          <td className="title width1">Size</td>
                          <td>60’’ x 40’’</td>
                        </tr>
                        <tr>
                          <td className="title width1">Brand </td>
                          <td>{data?.data.data.brand.name}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts category={data?.data.data.category.name} />
    </>
  );
}
