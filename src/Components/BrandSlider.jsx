import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function BrandSlider() {

  const BaseUrl = `https://ecommerce.routemisr.com`;

  function getBrandSlider() {
    return axios.get(`${BaseUrl}/api/v1/brands`);
  }

  let { data } = useQuery("BrandSlider", getBrandSlider);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
        },
      },
    
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-5 jump">
        <div className="container">
          <h2 className="main-title my-3">Our Brands</h2>

          <div className="brands">
            <Slider {...settings} className="">
              {data?.data.data.map((brands) => (
                <>
                  <img src={brands.image} className="w-100 p-2" alt="brands" />
                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
