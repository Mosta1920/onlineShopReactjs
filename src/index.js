import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./dark-mode.css";
import "./index.css";
// import "./old.css";


import "./navbar.css";
import "./footer.css";
import "./register.css";
import "./login.css";
import "./notFound.css";
import "./cart.css";
import "./products.css";
import "./about.css";
import "./contact.css";
import "./profile.css";

// import "./old.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
let queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    <ReactQueryDevtools initialIsOpen="false" position="bottom-right" />
  </QueryClientProvider>
);



