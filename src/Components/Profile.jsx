import React, { useContext , useEffect } from "react";
import { Helmet } from "react-helmet";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Orders from "../Components/Orders";
import ForgetPassword from "../Components/ForgetPassword";

export default function Profile() {
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  let navigate = useNavigate();

  let { userToken, setUserToken } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/onlineShopReactjs/login");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile - Online shop</title>
      </Helmet>

      <div className="my-account-wrapper my-5 min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-page-wrapper">
                <div className="row">
                  <div className="col-lg-3 col-md-4">
                    <div className="profile nav" role="tablist">
                      <Link
                        to="#dashboard"
                        className="active"
                        data-bs-toggle="tab"
                      >
                        <i className="fa fa-dashboard"></i>
                        Dashboard
                      </Link>

                      <Link  to="/onlineShopReactjs/allorders" >
                        <i className="fa fa-cart-arrow-down"></i> Your Orders
                      </Link>

                      <Link to="/onlineShopReactjs/forget-password" >
                        <i className="fa fa-key"></i> Forget Password
                      </Link>

                      {userToken !== null ? (
                        <Link
                          to="/onlineShopReactjs/login"
                          onClick={() => logOut()}
                        >
                          <i className="fa fa-sign-out"></i> Logout
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-9 col-md-8">
                    <div className="tab-content" id="profileContent">
                      <div
                        className="tab-pane fade show active"
                        id="dashboard"
                        role="tabpanel"
                      >
                        <div className="profile-content">
                          <h3>Dashboard</h3>
                          <div className="dashed-line py-3"></div>

                          <div className="welcome">
                            <p>
                              Hello, <strong>{decodedToken.name}</strong>
                            </p>
                          </div>

                          <p className="mb-0 welcome">
                            From your account dashboard. you can easily check &
                            view your recent orders, manage your shipping and
                            billing addresses and edit your password and account
                            details.
                          </p>
                        </div>
                      </div>

                      {/* <div
                        className="tab-pane fade"
                        id="orders"
                        role="tabpanel"
                      >
                      
                          <Orders />
                       
                      </div> */}

                      {/* <div
                        className="tab-pane fade"
                        id="account-password"
                        role="tabpanel"
                      >
                        <div className="profile-content">
                          <h3>Forget Password</h3>
                          <div className="dashed-line py-3"></div>

                          <ForgetPassword />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
