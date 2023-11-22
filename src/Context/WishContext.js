import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext();

export default function WishContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  const wishlistItemCount = wishlist.length

  const BaseUrl = `https://ecommerce.routemisr.com`;

  async function addToWishList(id) {
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/wishlist`,
        {
          productId: id,
        },

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getLoggedUserWishlist();
      return data;
    } catch (error) {
      return error;
    }
  }

  function getLoggedUserWishlist() {
    return axios
      .get(
        `${BaseUrl}/api/v1/wishlist`,

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      
      .then((response) => {
        
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async function removeWish(id) {
    try {
      let { data } = await axios.delete(
        `${BaseUrl}/api/v1/wishlist/${id}`,

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getLoggedUserWishlist,
        removeWish,
        wishlist,
        setWishlist,
        wishlistItemCount
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
