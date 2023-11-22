import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderImg2 from "../../src/Assets/images/slider-image-2.jpg";
import SliderImg3 from "../../src/Assets/images/slider-image-3.jpg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
  };

  return (
    <section className="jump">
      <div className="container mt-4 jump-1">
        <div className="row ">
          <Link to="/onlineShopReactjs/products/page-1">
          <div className="col-md-12">
            <Slider {...settings}>
              {/* <img
                className="w-100 rounded-4"
                src={SliderImg1}
                alt="Free Shipping"
              /> */}
              <img
                className="w-100 rounded-4"
                src={SliderImg2}
                alt="Free Returns"
              />
              <img
                className="w-100 rounded-4"
                src={SliderImg3}
                alt="Payment Online"
              />
          
            </Slider>
          </div>
          </Link>
          
        </div>
      </div>

        <div className="container ">
          <div className="slider rounded-4 shadow">
            <div className="row">
              <div className=" col-sm-6 col-lg-3  col-6">
                <div className="main-slider  ">
                  <div className="service-icon">
                    <i className="fa-solid fa-arrow-pointer fa-flip-horizontal"></i>
                  </div>
                  <div className="service-content">
                    <h3 className="main-title">Free Shipping</h3>
                    <span>Orders over $100</span>
                  </div>
                </div>
              </div>

              <div className=" col-sm-6 col-lg-3  col-6">
                <div className="main-slider ">
                  <div className="service-icon">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                  <div className="service-content">
                    <h3>Free Returns</h3>
                    <span>Within 30 days</span>
                  </div>
                </div>
              </div>

              <div className=" col-sm-6 col-lg-3  col-6">
                <div className="main-slider ">
                  <div className="service-icon">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <div className="service-content">
                    <h3>100% Secure</h3>
                    <span>Payment Online</span>
                  </div>
                </div>
              </div>

              <div className=" col-sm-6 col-lg-3  col-6">
                <div className="main-slider ">
                  <div className="service-icon">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <div className="service-content">
                    <h3>Best Price</h3>
                    <span>Best Seller</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </section>
  );
}
