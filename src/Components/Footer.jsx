import React from "react";
import AppStoreIcon from "../Assets/images/app-store.png";
import GooglePlayIcon from "../Assets/images/google-play.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer-one">
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-4 col-sm-12">
                <div className="f-about">
                  <div to="">
                    <div className="logo">
                      <i class="fa-solid fa-store my-4"></i>
                      <span> Online Shop</span>
                    </div>
                  </div>
                  <p className="black">
                  where convenience meets quality and a world of products awaits you at your fingertips.
                  </p>
                </div>
                <div className="footer-app-store">
                  <h5 className="download-title">Download Our App Now!</h5>
                  <ul>
                    <li>
                      <Link to="">
                        <img src={AppStoreIcon} alt="app" />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <img src={GooglePlayIcon} alt="play" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="col-xl-2 col-lg-2 col-sm-4">
                <div className="footer-link">
                  <h6 className="footer-title">Company</h6>
                  <ul>
                    <li>
                      <Link to="/onlineShopReactjs/about">About</Link>
                    </li>
                    <li>
                      <Link to="/onlineShopReactjs/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="">Marketing</Link>
                    </li>
                    <li>
                      <Link to="">Awards</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-2 col-sm-4">
                <div className="footer-link">
                  <h6 className="footer-title">Services</h6>
                  <ul>
                    <li>
                      <Link to="">Products</Link>
                    </li>
                    <li>
                      <Link to="">Business</Link>
                    </li>
                    <li>
                      <Link to="">Developer</Link>
                    </li>
                    <li>
                      <Link to="">Insights</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-4 col-sm-4">
                <div className="footer-contact">
                  <h6 className="footer-title">Help & Suuport</h6>
                  <ul>
                    <li>
                      <i class="fa-solid fa-location-dot"></i> Madison Street,
                      NewYork, USA
                    </li>
                    <li>
                      <i class="fa-solid fa-phone"></i> +88 556 88545
                    </li>
                    <li>
                      <i class="fa-solid fa-paper-plane"></i> support@uideck.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="
                  copyright
                  text-center
                  d-md-flex
                  justify-content-between
                  align-items-center
                "
                >
                  <p className="text">
                    Copyright © 2023 Online shop. All Rights Reserved
                  </p>
                  <ul className="social">
                    <li>
                      <Link to="">
                        <i className="fa-brands fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i class="fa-brands fa-x-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
