import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { cartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishContext";

export default function Navbar() {

  let { userToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(cartContext);
  let { wishlistItemCount } = useContext(WishListContext);

  const location = useLocation();
  const pathName = location.pathname;

  const links = [
    { path: "/onlineShopReactjs/products/page-1", link: "All Products" },
    { path: "/onlineShopReactjs/about", link: "About" },
    { path: "/onlineShopReactjs/contact", link: "Contact" },
  ];

  const handleClick = () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse) {
      navbarCollapse.classList.remove("show");
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve dark mode preference from local storage
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode styles directly to the body element
    document.body.classList.toggle("dark", darkMode);
    // Store dark mode preference in local storage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <section className=" navbar-area sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg">


            <span onClick={toggleDarkMode} className="xx d-lg-none">
              {darkMode ? (
                <i className="fa-solid fa-moon light fa-2x dark-mode me-2"></i>
              ) : (
                <i className="fa-regular fa-sun dark fa-2x me-2"></i>
              )}
            </span>



            <Link to="/onlineShopReactjs">
              <div className="logo">
                <i class="fa-solid fa-store my-4"></i>
                <span> Online Shop</span>
              </div>
            </Link>

            <label
              className="burger d-lg-none"
              htmlFor="burger"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <input type="checkbox" id="burger" />
              <span></span>
              <span></span>
              <span></span>
            </label>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto ">
                {links.map((link) => (
                  <li className="nav-item" onClick={handleClick}>
                    <Link
                      to={link.path}
                      className={
                        pathName === link.path ? "nav-link active" : "nav-link"
                      }
                    >
                      {link.link}
                    </Link>
                  </li>
                ))}

                {userToken !== null ? (
                  <>
                    <li className="nav-item d-lg-none" onClick={handleClick}>
                      <Link to="/onlineShopReactjs/cart">
                        Cart &nbsp;
                        <span className="badge">{numOfCartItems}</span>
                      </Link>
                    </li>

                    <li className="nav-item d-lg-none" onClick={handleClick}>
                      <Link to="/onlineShopReactjs/wishlist">
                        Wishlist &nbsp;
                        <span className="badge">{wishlistItemCount}</span>
                      </Link>
                    </li>

                    <li className="nav-item d-lg-none" onClick={handleClick}>
                      <Link to="/onlineShopReactjs/profile">Profile</Link>
                    </li>
                  </>
                ) : (
                  <li
                    className="nav-item d-lg-none text-info"
                    onClick={handleClick}
                  >
                    <Link to="/onlineShopReactjs/login">Login</Link>
                  </li>
                )}
              </ul>

              <div className="navbar-btn">
                <ul>
                  {userToken !== null ? (
                    <div className="navbar-btn d-none d-lg-inline-block">
                      <ul>
                        <span onClick={toggleDarkMode}>
                          {darkMode ? (
                            <i className="fa-solid fa-moon light dark-mode fa-2x mt-1 me-2"></i>
                          ) : (
                            <i className="fa-regular fa-sun dark mt-1 fa-2x me-2"></i>
                          )}
                        </span>

                        <div className="nav-icon">
                          <div className="same-style-2 header-cart">
                            <Link to="/onlineShopReactjs/cart">
                              <i class="fa-solid fa-cart-shopping mt-2"></i>
                              <span className="pro-count red">
                                {numOfCartItems}
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="nav-icon">
                          <div className="same-style-2 header-cart">
                            <Link to="/onlineShopReactjs/wishlist">
                              <i class="fas fa-heart fa-lg mt-3"></i>

                              <span className="pro-count red">
                                {wishlistItemCount}
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="nav-icon">
                          <div className="same-style-2">
                            <Link to="/onlineShopReactjs/profile">
                              <i class="fa-solid fa-user mt-2"></i>
                            </Link>
                          </div>
                        </div>
                      </ul>
                    </div>
                  ) : (
                    <>
                      <div className="navbar-btn d-none d-lg-inline-block">
                        <ul>
                          <span
                            onClick={toggleDarkMode}
                            className="pe-1 pt-1"
                          >
                            {darkMode ? (
                              <i className="fa-solid fa-moon light fa-2x dark-mode me-2"></i>
                            ) : (
                              <i className="fa-regular fa-sun dark fa-2x me-2"></i>
                            )}
                          </span>

                          <Link
                            className="btn primary-btn"
                            to="/onlineShopReactjs/login"
                          >
                            Login
                          </Link>
                        </ul>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
