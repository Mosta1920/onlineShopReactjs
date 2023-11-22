import React, { useEffect } from "react";
import Help from "../Assets/images/Help.svg";
import Contact from "../Assets/images/Contact.svg";
import Orders from "../Assets/images/Orders.svg";

export default function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main className="container mt-5">
        <div className="container ">
          <div className="text-about my-5">
            <h2 className="text-main py-4">
              Contact &nbsp;
              <span>
                <i class="fa-solid fa-store"></i>
                <span> Online Shop</span>
              </span>
            </h2>
            <h6>
              Welcome to our online shopping website, where convenience meets
              quality and a world of products awaits you at your fingertips.
            </h6>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="box_contacts">
                <h2>Online Shop Help Center</h2>
                <div className="black">+94 423-23-221</div>
                <div className="black">help@onlineshop.com</div>
                <small>MON to FRI 9am-6pm SAT 9am-2pm</small>
                <img
                  src={Help}
                  height={200}
                  alt="Secure and Seamless Checkout"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_contacts">
                <h2>Online Shop Showroom</h2>
                <div className="black">6th Forrest Ray, London</div>
                <div className="black">10001 UK</div>
                <small>MON to FRI 9am-6pm SAT 9am-2pm</small>
                <img
                  src={Contact}
                  height={200}
                  alt="Secure and Seamless Checkout"
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="box_contacts">
                <h2>Online Shop Orders</h2>
                <div className="black">+94 423-23-221</div>
                <div className="black">order@onlineshop.com</div>
                <small>MON to FRI 9am-6pm SAT 9am-2pm</small>
                <img
                  src={Orders}
                  height={200}
                  alt="Secure and Seamless Checkout"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="text-main my-4">Drop Us a Line</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <input type="text" placeholder="Name *" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email *" />
              </div>

              <div className="form-group">
                <textarea placeholder="Message *"></textarea>
              </div>

              <div className="form-group">
                <input
                  className="btn primary-btn full-width"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>

            <div className="col-lg-8 col-md-6">
              <iframe
                className="map_contact"
                width="520"
                height="400"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Madison%20Street,%20New%20York,%20USA+(Online%20Shopping)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <span href="https://www.maps.ie/population/">
                  Calculate population in area
                </span>
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
