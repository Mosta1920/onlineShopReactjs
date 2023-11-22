import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import EmptyCart from "../Components/EmptyCart";

export default function Cart() {
  let {
    cartProducts,
    getLoggedUserCart,
    removeCartItem,
    updateProductCount,
    clearCart,
    totalCartPrice,
    numOfCartItems,
    setCartProducts,
    setNumOfCartItems,
  } = useContext(cartContext);

  async function updateCount(id, count) {
    await updateProductCount(id, count);
    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully updated
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x text-warning">
              <i class="fa-solid fa-cart-arrow-down"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    } else {
      toast.error(
        <div className="text-center">
          There is an error with your product update, Please try again later
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
  }

  async function removeItem(id) {
    await removeCartItem(id);
    if ("success") {
      toast.success(
        <div className="text-center">
          Your product has been successfully removed
        </div>,
        {
          duration: 5000,
          icon: (
            <div className="fa-2x text-danger">
              <i class="fa-solid fa-cart-arrow-down"></i>
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
  }

  async function clearCartItems() {
    await clearCart();
    setCartProducts(null);
    setNumOfCartItems(0);
  }

  useEffect(() => {
    getLoggedUserCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart - Online shop</title>
      </Helmet>

      {cartProducts !== null && numOfCartItems !== 0 ? (
        <section className="container jump mt-5">
          <div className="row">
            <h2 className="cart-page-title ">
              <i class="fa-solid fa-cart-flatbed name "></i> Your cart items :
            </h2>
            <div className="dashed-line pt-3"></div>
          </div>

          <div className="row ">
            <div className="col-12">
              {cartProducts.map((product) => (
                <div
                  className="row cart-product text-center"
                  key={product.product.id}
                >
                  <div className="col-md-2 col-sm-12 py-2">
                    <Link
                      to={`/onlineShopReactjs/productdetails/${product.product.id}`}
                    >
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-50"
                      />
                    </Link>
                  </div>

                  <div className="col-md-3 col-sm-12 py-2 black">
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </div>

                  <div className="col-md-3 col-sm-12 py-2">
                    <button
                      className="btn border-0 cart-btn "
                      onClick={() =>
                        updateCount(product.product.id, product.count - 1)
                      }
                    >
                      <i class="fa-solid fa-circle-minus fa-lg"></i>
                    </button>
                    <span className="h5 black">{product.count}</span>
                    <button
                      className="btn border-0 cart-btn"
                      onClick={() =>
                        updateCount(product.product.id, product.count + 1)
                      }
                    >
                      <i class="fa-solid fa-circle-plus fa-lg"></i>
                    </button>
                  </div>

                  <div className="col-md-3 col-sm-12 py-2">
                    {product.price} EGP
                  </div>

                  <div className="col-md-1 col-sm-12 py-2">
                    <button
                      to="#"
                      className="btn border-0 red"
                      onClick={() => removeItem(product.product.id)}
                    >
                      <i class="fa-solid fa-circle-xmark fa-lg"></i>
                    </button>
                  </div>
                </div>
              ))}

              {cartProducts.length !== 0 ? (
                <div className="d-flex justify-content-between my-2">
                  <Link className="btn primary-btn-outline me-1" to="/products">
                    Continue Shopping
                  </Link>

                  <button className="btn primary-btn " onClick={clearCartItems}>
                    Clear Cart
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="row">
                <div className="col-lg-4 col-md-6"></div>
                <div className="col-lg-4 col-md-6"></div>

                
                <div className="col-lg-4 col-md-12 mb-3 jump">
                  <div className="grand-total">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-cart black">
                        Cart Total
                      </h4>
                    </div>
                    <h5 className="black fw-lighter ">
                      Total products
                      <span>{numOfCartItems}</span>
                    </h5>

                    <h4 className="grand-total-title">
                      Total price
                      <span>EGP {totalCartPrice}</span>
                    </h4>
                    <Link className="m-0 p-0" to="/onlineShopReactjs/checkout">
                      <button className="btn text-white ">Checkout</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </>
  );
}
