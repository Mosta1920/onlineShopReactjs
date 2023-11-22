import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  const BaseUrl = `https://ecommerce.routemisr.com`;

  async function addToCart(id) {
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/cart`,
        {
          productId: id,
        },

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getLoggedUserCart();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getLoggedUserCart() {
    try {
      let { data } = await axios.get(`${BaseUrl}/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function removeCartItem(id) {
    try {
      let { data } = await axios.delete(
        `${BaseUrl}/api/v1/cart/${id}`,

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function updateProductCount(id, count) {
    try {
      let { data } = await axios.put(
        `${BaseUrl}/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function onlinePayment(cartId, url, values) {
    return await axios
      .post(
        `${BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function clearCart() {
    return await axios
      .delete(`${BaseUrl}/api/v1/cart/`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartId,
        numOfCartItems,
        cartProducts,
        totalCartPrice,
        setNumOfCartItems,
        setTotalCartPrice,
        setCartProducts,

        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateProductCount,
        clearCart,
        

        onlinePayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
