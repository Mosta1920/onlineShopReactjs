import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "../Context/WishContext";

export default function WishButton({ product }) {

  let { addToWishList, removeWish, wishlist, setWishlist } =
  useContext(WishListContext);

  const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(product.id));

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

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeWishItem(product.id);
      setIsInWishlist(false);
    } else {
      addProductToWishList(product.id);
      setIsInWishlist(true);
    }
  };

  return (
    <button onClick={handleToggleWishlist}>
      {isInWishlist ? (
        <i class="fas fa-heart fa-lg red"></i>
      ) : (
        <i class="fas fa-heart fa-lg "></i>
      )}
    </button>
  );
}
