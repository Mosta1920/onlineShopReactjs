
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Pagination() {

  const location = useLocation();
  const pathName = location.pathname;
  return (


    



    <div className="pro-pagination-style text-center mt-4">
    <ul>
      <li>
        <Link className="prev" to="/onlineShopReactjs/products/page-1">
          <i class="fa-solid fa-chevron-left fa-lg"></i>
        </Link>
      </li>
      <li>
        <Link
          className={pathName === "/onlineShopReactjs/products/page-1" ? "bg-green" : ""}
          to="/onlineShopReactjs/products/page-1"
        >
          1
        </Link>
      </li>
      <li>
        <Link
          className={pathName === "/onlineShopReactjs/products/page-2" ? "bg-green" : ""}
          to="/onlineShopReactjs/products/page-2"
        >
          2
        </Link>
      </li>
      <li>
        <Link className="next" to="/onlineShopReactjs/products/page-2">
          <i class="fa-solid fa-chevron-right fa-lg"></i>
        </Link>
      </li>
    </ul>
  </div>
  );
}
