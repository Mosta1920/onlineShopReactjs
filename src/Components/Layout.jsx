import React, { useEffect, useContext } from "react";
import Navbar from "../Components//Navbar";
import Footer from "../Components//Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });

  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <div>
        <Offline>
          <div className="container fixed-bottom mb-5">
            <div className="row">
              <div className="col-auto network p-0">
                <div class="alert alert-error p-2 d-flex align-items-center m-0">
                  <div class="alert-icon m-1 p-3 text-white">
                    <i class="fa-solid fa-wifi"></i>
                  </div>
                  <div class="alert-message">
                    <h5 class="text-white">You are currently offline</h5>
                    <h6 class="text-white">
                      Please check your internet connection.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  );
}
