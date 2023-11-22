import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { UserContext } from "../Context/UserContext";
import WishButton from "../Components/WishButton";
import { WishListContext } from "../Context/WishContext";

export default function Product({ product }) {
  //import Context
  let { addToCart } = useContext(cartContext);
  let { userToken } = useContext(UserContext);
  let { wishlist } = useContext(WishListContext);

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



  return (
    <>
      <div key={product.id} className="col-xl-3 col-lg-3 col-sm-6 col-6 py-2">
        <div className="single-product-wrap rounded-4">
        <div className="skeleton"></div>

          <div className="product-img product-img-zoom p-2">
            <Link
              to={`/onlineShopReactjs/productdetails/${product.id}`}
              // target="_top"
            >
              {/* <div className="header-img skeleton"></div> */}
           
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
                  <div className="pro-add-to-cart">
                    <button
                      onClick={() => addProduct(product._id)}
                      title="Add to Cart"
                      className="p-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="product-content-wrap-2 product-content-position text-center">
                  <div className="locked-cart">
                    <button
                      onClick={addProductLocked}
                      title="Add to Cart"
                      aria-disabled
                      className="p-2"

                    >
                      Add To Cart &nbsp;
                      <i class="fa-solid fa-lock"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
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
              <h3 className="mt-1 rating">{product.ratingsAverage}</h3>
            </div>

            <h5 className="my-1 name">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h5>

            <h6 className="my-1 category">{product.category.name}</h6>

            <div className="my-2 price">
              <h5 className="price">EGP{product.price}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
