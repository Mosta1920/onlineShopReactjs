// import logo from './logo.svg';

import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Components/Home";
import Profile from "./Components/Profile";

import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import ProductsPage from "./Components/ProductsPage";

import Cart from "./Components/Cart";
import Orders from "./Components/Orders";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgetPassword from "./Components/ForgetPassword";
import Checkout from "./Components/Checkout";
import VerifyCode from "./Components/VerifyCode";
import ResetPassword from "./Components/ResetPassword";
import Layout from "./Components/Layout";
import About from "./Components/About";
import Contacts from "./Components/Contacts";
import NotFound from "./Components/NotFound";
import Wishlist from "./Components/Wishlist";

import ProtectedRoute from "./Components/ProtectedRoute";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishContext";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/onlineShopReactjs/", element: <Home /> },

        { path: "/onlineShopReactjs/products", element: <Products /> },
        { path: "/onlineShopReactjs/products/page-1", element: <Products /> },
        {
          path: "/onlineShopReactjs/products/page-2",
          element: <ProductsPage />,
        },
        {
          path: "/onlineShopReactjs/productdetails/:id",
          element: <ProductDetails />,
        },

        {
          path: "/onlineShopReactjs/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/onlineShopReactjs/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/onlineShopReactjs/allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/onlineShopReactjs/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: "/onlineShopReactjs/login", element: <Login /> },
        { path: "/onlineShopReactjs/register", element: <Register /> },
        {
          path: "/onlineShopReactjs/forget-password",
          element: <ForgetPassword />,
        },
        { path: "/onlineShopReactjs/verify-code", element: <VerifyCode /> },
        {
          path: "/onlineShopReactjs/reset-password",
          element: <ResetPassword />,
        },

        { path: "/onlineShopReactjs/about", element: <About /> },
        { path: "/onlineShopReactjs/contact", element: <Contacts /> },
        {
          path: "/onlineShopReactjs/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <CartContextProvider>
      <WishListContextProvider>
        <UserContextProvider>

          <RouterProvider router={routers}>

          </RouterProvider>

          <Toaster />
        </UserContextProvider>
      </WishListContextProvider>
    </CartContextProvider>
  );
}
