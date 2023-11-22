import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../Context/WishContext";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function WishList() {
  const { addToCart } = useContext(cartContext);

  let {
    getLoggedUserWishlist,
    removeWish,
    wishlist,
    setWishlist,
    wishlistItemCount,
  } = useContext(WishListContext);

  let [allProducts, setAllProducts] = useState(null);

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

  async function removeWishItem(productId) {
    await removeWish(productId);
    getProductWishlist();

    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully removed from Wishlist page
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x">
              <i class="fa-solid fa-trash red"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    } else {
      toast.error(
        <div className="text-center">
          There is an error with your product remove, Please try again later
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x">
              <i class="fa-solid fa-circle-exclamation"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    }
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  async function getProductWishlist() {
    let { data } = await getLoggedUserWishlist();
    setAllProducts(data.data);
  }

  useEffect(() => {
    getProductWishlist();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="container jump mt-5">
        <div className="row">
          {wishlistItemCount !== 0 ? (
            <>
              <h2 className="cart-page-title ">
                <i class="fa-solid fa-heart red"></i> Your Wishlist items :
              </h2>
              <div className="dashed-line pt-3"></div>

              {allProducts?.map((product) => (
                <div
                  key={product.id}
                  className="col-xl-3 col-lg-3 col-sm-6 col-6 py-2 jump"
                >
                  <div className="single-product-wrap rounded-4">
                    <div className="product-img product-img-zoom p-2">
                      <Link
                        to={`/onlineShopReactjs/productdetails/${product.id}`}
                      >
                        <img
                          src={product.imageCover}
                          className="w-100 rounded-3"
                          alt={product.title}
                        />
                      </Link>

                      <div className="wishlist-btn">
                        <button onClick={() => removeWishItem(product.id)}>
                          <i class="fa-solid fa-trash-can fa-lg red"></i>
                        </button>
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
                    </div>

                    <div className="product-content-wrap-2 text-center">
                      <div className="product-rating-wrap ">
                        <div className="product-rating">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star "></i>
                        </div>
                        <h3 className="mt-1 rating">
                          {product.ratingsAverage}
                        </h3>
                      </div>

                      <h5 className="my-1 name">
                        {product.title.split(" ").slice(0, 2).join("  ")}
                      </h5>

                      <h6 className="my-1 category">{product.category.name}</h6>

                      <div className="my-2 price">
                        <h5 className="price">EGP{product.price}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <section>
              <div className="container jump">
                <div className="row d-flex justify-content-center my-5">
                  <div className="col-xxl-7 col-xl-8 col-lg-8">
                    <div className="cart-empty text-center gap-1">
                      <span className="fa-9x pb-2 cart-icon">
                        <i class="fa-regular fa-heart"></i>
                      </span>
                      <h5 className="h1 my-4">Your Wishlist is empty</h5>

                      <div className="cart-clear d-flex justify-content-center align-items-center  my-2 ">
                        <Link
                          className=" btn primary-btn-outline mt-2 "
                          to="/onlineShopReactjs/products"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
