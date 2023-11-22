import React, { useContext, useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
    //BaseUrl
    const BaseUrl = `https://ecommerce.routemisr.com`;

  let { setUserToken } = useContext(UserContext);

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function loginSumbmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        seterror(err.response.data.message);
        setisLoading(false);
      });

    if (data.message === "success") {
      navigate("/");
      setisLoading(false);
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSumbmit,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Online shop</title>
      </Helmet>

      <section className="login jump">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="login-form col-sm-6 m-4 p-4 ">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-style-two">
                  {error !== null ? (
                    <div className="alert alert-error-light d-flex align-items-center p-2 ">
                      <div className="alert-icon m-1 p-3">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <div className="alert-message">
                        <h5 className="text-black m-0 p-0">
                          The email or password you entered is incorrect
                        </h5>
                        <p className="text-black">
                          Please ensure your email and password are correct, and
                          try again.
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="form-input m-0">
                    <label htmlFor="email" className="ms-2">
                      Enter your email:
                    </label>
                    <div className="input-items default">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        name="email"
                        id="email"
                        type="text"
                        className="fw-bold text-grey"
                        placeholder="Email"
                      />
                      <i className="fa-solid fa-at"></i>
                    </div>

                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i className="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-input">
                    <label htmlFor="password" className="ms-2">
                      Enter your Password:
                    </label>
                    <div className="input-items default">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="fw-bold text-grey"
                        to
                      />
                      <i className="fa-solid fa-lock"></i>
                    </div>

                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i className="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.password}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6 m-1">
                    <div className="form-input">
                      {isLoading ? (
                        <button className="btn primary-btn">
                          <section className="dots-container">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                          </section>
                        </button>
                      ) : (
                        <div className="d-block">
                          <button
                            className="btn primary-btn"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Login
                          </button>

                          <Link
                            className="ms-2 my-2 "
                            type="submit"
                            to="/forget-password"
                          >
                            Forget password
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="register-form col-sm-6 p-4">
              <div className="login-content">
                <h4 className="login-title">Create a new account</h4>
                <p className="text">
                  By creating an account, you can personalize your experience,
                  save preferences, and securely store your information. It
                  typically involves providing basic details such as your name,
                  email address, and a password.
                </p>
                <div className="form-input">
                  <Link to="/onlineShopReactjs/register" className="col-12 btn primary-btn">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
