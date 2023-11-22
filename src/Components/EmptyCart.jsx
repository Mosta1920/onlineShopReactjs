
import { Link } from "react-router-dom";
import React from 'react';

export default function EmptyCart() {
  return <>
     
      <section>
        <div className="container jump">
          <div className="row d-flex justify-content-center my-5">
            <div className="col-xxl-7 col-xl-8 col-lg-8">
              <div className="cart-empty text-center gap-1">
                <span className="fa-9x pb-2 cart-icon"><i class="fa-solid fa-cart-shopping"></i></span>
                <h5 className="h1 my-4">Your Cart is empty</h5>
             
                <div className="cart-clear d-flex justify-content-center align-items-center  my-2 ">
                  <Link
                    className=" btn primary-btn-outline mt-2 "
                    to="/products"
                  >
                    Continue Shopping
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
   </>
}
