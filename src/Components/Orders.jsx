import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Loading from "../Components//Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function AllOrders() {
  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  const [userOrder, setUserOrder] = useState(null);
  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("userToken"));
    getOrders(token.id);
    window.scrollTo(0, 0);
  }, []);

  async function getOrders(id) {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/v1/orders/user/${id}`);

      console.log(data);
      setUserOrder(data);
    } catch (error) {}
  }

  if (userOrder === null) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All orders - Online shop</title>
      </Helmet>

      <div className="container jump mt-5">
        <div className="row">
          <h2 className="cart-page-title ">
            <i class="fa-solid fa-truck-ramp-box name"></i> Your Orders :
          </h2>
          <div className="dashed-line pt-3"></div>
        </div>

        {userOrder.map((order) => (
          <div className="orders mb-5">
            <div>
              <div className="text-center">
                <div className=" d-flex justify-content-center align-items-center row pb-3">
                  {order.cartItems?.map((item) => {
                    return (
                      <div
                        className="row order-product text-center mb-2"
                        key={order.id}
                      >
                        <div className="col-md-2 col-sm-2">
                          <Link to="#">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={100}
                            />
                          </Link>
                        </div>

                        <h5 className=" col-md-3 col-sm-12 text-main">
                          {item.product.title.split(" ").slice(0, 2).join(" ")}
                        </h5>

                        <h6 className="col-md-2 col-sm-12 ">
                          {item.product.category.name}
                        </h6>

                        <h6 className="col-md-2 col-sm-12 ">
                          {item.product.brand.name}
                        </h6>

                        <h6 className="col-md-1 col-sm-12 ">
                          {item.count} item
                        </h6>

                        <h5 className="col-md-2 col-sm-12 price">
                          EGP {item.price}
                        </h5>
                      </div>
                    );
                  })}
                </div>

                {/* <div className="dashed-line py-3"></div> */}

                <h5>
                  Details : <span>{order.shippingAddress.details}</span>{" "}
                </h5>

                <h5>
                  Phone : <span>{order.shippingAddress.phone}</span>
                </h5>

                <h5>
                  City : <span>{order.shippingAddress.city}</span>
                </h5>

                <h5>
                  PayMent Method : <span>{order.paymentMethodType}</span>
                </h5>
                <h5 className="text-main">
                  Total Price : <span>{order.totalOrderPrice}</span>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
