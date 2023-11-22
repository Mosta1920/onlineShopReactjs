import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  
  //BaseUrl
  const BaseUrl = `https://ecommerce.routemisr.com`;

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function registerSumbmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signup`, values)
      .catch((err) => {
        seterror(err.response.data.message);
        setisLoading(false);
      });

    if (data.message === "success") {
      navigate("/onlineShopReactjs/login");
      setisLoading(false);
    }
  }

  let phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(10, "Must be 10 characters or less")
    .required("Your name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Your phone number is not valid")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSumbmit,
  });

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register - Online shop</title>
      </Helmet>

      <section className="register jump">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 ">
              <form onSubmit={formik.handleSubmit}>
                <div className="signin-form form-style-two">
                  <div className="row">
                    <div className="col-md-12">
                      {error !== null ? (
                        <div class="alert alert-error-light d-flex align-items-center m-0 p-0">
                          <div class="alert-icon m-1 p-3">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                          </div>
                          <div class="alert-message">
                            <h5 class="message-title text-black m-0 p-0">
                              Email already in use
                            </h5>
                            <p class="text-black">
                              Please choose a different email address.
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="form-input">
                        <label htmlFor="name" className="ms-2">
                          Name will be used to personalize your experience
                        </label>
                        <div className="input-items default">
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="fw-bold text-grey "
                          />

                          <i class="fa-solid fa-user"></i>
                        </div>

                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-danger fw-semibold mt-1">
                            <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                            {formik.errors.name}
                          </div>
                        ) : (
                          ""
                        )}

                        {formik.touched.name && !formik.errors.name ? (
                          <div className="text-success fw-semibold mt-1">
                            <i class="fa-solid fa-circle-check mx-1"></i>
                            <span>Your name has been approved</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-input">
                        <label htmlFor="email" className="ms-2">
                          Your account will be under this email
                        </label>
                        <div className="input-items default ">
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name="email"
                            id="email"
                            type="text"
                            className="fw-bold text-grey "
                            placeholder="Email"
                          />
                          <i class="fa-solid fa-at"></i>
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger fw-semibold mt-1">
                            <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                            {formik.errors.email}
                          </div>
                        ) : (
                          ""
                        )}

                        {formik.touched.email && !formik.errors.email ? (
                          <div className="text-success fw-semibold mt-1">
                            <i class="fa-solid fa-circle-check mx-1"></i>
                            <span>Your email is Valid</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-input">
                        <label htmlFor="password" className="ms-2">
                          Password for your account
                        </label>
                        <div className="input-items default">
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="fw-bold text-grey "
                            to
                          />
                          <i class="fa-solid fa-lock"></i>
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger fw-semibold mt-1">
                            <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                            {formik.errors.password}
                          </div>
                        ) : (
                          ""
                        )}

                        {formik.touched.password && !formik.errors.password ? (
                          <div className="text-success fw-semibold mt-1">
                            <i class="fa-solid fa-circle-check mx-1"></i>
                            <span>Your password is Valid</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-input">
                        <label htmlFor="rePassword" className="ms-2">
                          Re-Type your Password
                        </label>
                        <div className="input-items default">
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            id="rePassword"
                            type="password"
                            placeholder="Re-Password"
                            className="fw-bold text-grey "
                          />
                          <i class="fa-solid fa-rotate-right "></i>
                        </div>

                        {formik.touched.rePassword &&
                        formik.errors.rePassword ? (
                          <div className="text-danger fw-semibold mt-1">
                            <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                            {formik.errors.rePassword}
                          </div>
                        ) : (
                          ""
                        )}

                        {formik.touched.rePassword &&
                        !formik.errors.rePassword ? (
                          <div className="text-success fw-semibold mt-1">
                            <i class="fa-solid fa-circle-check mx-1"></i>
                            <span>Your Re-password is matched</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 ">
                      <div className="form-input ">
                        <label htmlFor="phone" className="ms-2">
                          Insert for your Phone number
                        </label>
                        <div className="input-items default ">
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            id="phone"
                            type="tel"
                            placeholder="+02 XXX-XXX-XXX"
                            className="fw-bold text-grey "
                          />
                          <i class="fa-solid fa-phone"></i>
                        </div>

                        {formik.touched.phone && formik.errors.phone ? (
                          <div className="text-danger fw-semibold mt-1">
                            <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                            {formik.errors.phone}
                          </div>
                        ) : (
                          ""
                        )}

                        {formik.touched.phone && !formik.errors.phone ? (
                          <div className="text-success fw-semibold mt-1">
                            <i class="fa-solid fa-circle-check mx-1"></i>
                            <span>Your Phone number is Valid</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 m-auto m-1">
                      <div className="form-input rounded-buttons">
                        {isLoading ? (
                          <button className="btn primary-btn">
                            <section class="dots-container">
                              <div class="dot"></div>
                              <div class="dot"></div>
                              <div class="dot"></div>
                              <div class="dot"></div>
                              <div class="dot"></div>
                            </section>
                          </button>
                        ) : (
                          <button
                            className="btn primary-btn"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-input text-center">
                        <p className="text">
                          By registering you agree with the
                          <Link to="">Terms and Conditions</Link> &
                          <Link to="">Privacy</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
