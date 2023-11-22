import React, { useEffect } from "react";

import Range from "../Assets/images/Range.svg";
import Interface from "../Assets/images/Interface.svg";
import Recommendations from "../Assets/images/Recommendations.svg";
import Secure from "../Assets/images/Secure.svg";
import Support from "../Assets/images/Support.svg";
import Ratings from "../Assets/images/Ratings.svg";

export default function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="container mt-5">
        <div className="text-about">
          <h2 className="text-main py-4">
            About &nbsp;
            <span>
              <i class="fa-solid fa-store"></i>
              <span> Online Shop</span>
            </span>
          </h2>
          <h6 className="black">
            Welcome to our online shopping website, where convenience meets
            quality and a world of products awaits you at your fingertips.
          </h6>
        </div>

        <div className="container">
          <div className="row about-row-white">
            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Extensive Product Range</h2>

                <p className="lead black black">
                  Our online shopping website boasts an extensive catalog of
                  products across various categories.
                </p>

                <p className="black">
                  From fashion and electronics to home decor and beauty
                  essentials, we have carefully curated a diverse selection to
                  cater to your unique preferences. With thousands of products
                  from renowned brands and emerging designers, you'll find
                  everything you need in one convenient place.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-sm-8 box-img">
              <img src={Range} height={400} alt="Extensive Product Range" />
            </div>
          </div>

          <div className="row about-row">
            <div className="col-lg-5 col-sm-8 box-img">
              <img src={Interface} height={400} alt="Intuitive User Interface" />
            </div>

            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Intuitive User Interface</h2>

                <p className="lead black">
                  Navigating our website is a breeze, thanks to our intuitive
                  user interface.
                </p>

                <p className="black">
                  We believe in simplicity and user-friendly design, ensuring
                  that you can find what you're looking for effortlessly. Our
                  thoughtfully organized categories, search filters, and sorting
                  options allow you to refine your search and discover products
                  that align with your specific requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="row about-row-white">
            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Personalized Recommendations</h2>

                <p className="lead black">
                  We understand that every customer is unique
                </p>

                <p className="black">
                  That's why we strive to offer personalized recommendations
                  tailored to your interests. Through advanced algorithms and
                  machine learning, our website analyzes your browsing and
                  purchase history to suggest relevant products that match your
                  preferences. Our goal is to make your shopping experience more
                  enjoyable and help you discover new items that you'll love.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-sm-8">
              <img src={Recommendations} height={400} alt="Personalized Recommendations" />
            </div>
          </div>

          <div className="row about-row">
            <div className="col-lg-5 col-sm-8 box-img">
              <img src={Secure} height={400} alt="Secure and Seamless Checkout" />
            </div>

            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Secure and Seamless Checkout</h2>

                <p className="lead black">
                  We prioritize the security of your transactions.
                </p>

                <p className="black">
                  Our website incorporates robust encryption and secure payment
                  gateways to safeguard your sensitive information. With a
                  streamlined checkout process, you can complete your purchases
                  quickly and conveniently, eliminating any unnecessary hurdles.
                  We accept various payment methods, ensuring flexibility and
                  ease of use.
                </p>
              </div>
            </div>
          </div>

          <div className="row about-row-white">
            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Prompt Customer Support</h2>

                <p className="lead black">
                  We value your satisfaction, and our dedicated customer support
                  team is always ready to assist you.
                </p>

                <p className="black">
                  Whether you have inquiries about products, need help with
                  order tracking, or require assistance with returns or
                  exchanges, our knowledgeable and friendly support staff is
                  just a click away. We strive to provide prompt responses and
                  resolve any concerns promptly, ensuring a smooth and
                  satisfactory shopping journey.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-sm-8">
              <img src={Support}  height={400} alt="Prompt Customer Support" />
            </div>
          </div>

          <div className="row about-row">
            <div className="col-lg-5 col-sm-8 box-img">
              <img src={Ratings} height={400} alt="Customer Reviews and Ratings" />
            </div>

            <div className="col-lg-5">
              <div className="box-text">
                <h2 className="pb-3 text-main">Customer Reviews and Ratings</h2>

                <p className="lead black">
                  Making informed purchase decisions is crucial
                </p>

                <p className="black">
                  Our online shopping website facilitates this by providing
                  customer reviews and ratings for products. Gain insights from
                  fellow shoppers who have already experienced the products
                  you're interested in. Their feedback helps you gauge product
                  quality, reliability, and overall customer satisfaction,
                  empowering you to make confident choices.
                </p>
              </div>
            </div>
          </div>
        </div>

      
      </section>
    </>
  );
}
