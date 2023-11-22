import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not found - Online shop</title>
      </Helmet>

      <section className="notFound-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-8 col-lg-8">
              <div className="notFound-content text-center">
                <span className="notFound-404">404</span>
                <h5 className="sub-title">Oops! that page doesn't exist.</h5>
                <p className="text">
                  "Please check the URL or try searching for the product or
                  category you were looking for in the search bar. If you
                  believe you've reached this page in notFound, please contact
                  our customer support team &nbsp;
                  <span>
                    <Link className="notFound-contact" to="contact">
                      customer support team
                    </Link>
                  </span>
                  &nbsp; who will be happy to assist you. Thank you for your
                  understanding and patience. Happy shopping!"
                </p>
                <div className="notFound-form">
                  <form action="#0">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for page" />
                    <div className="notFound-btn">
                      <button className="btn primary-btn rounded-5 me-1">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
