import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  const BaseUrl = `https://ecommerce.routemisr.com`;

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(8, "New Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "New Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("newPassword is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function resetPassword(values) {
    setisLoading(true);
    let { data } = await axios
      .put(`${BaseUrl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        seterror(err.response.data.message);
        setisLoading(false);
      });

    if (data.token === "success") {
      navigate("/onlineShopReactjs/login");
      setisLoading(false);
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset password - Online shop</title>
      </Helmet>
      
      <section className="login jump mt-5 mb-5 vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 m-4 p-4 ">
              <form onSubmit={formik.handleSubmit}>
                <div className="signin-form-two form-style-two light-">
                  {error !== null ? (
                    <div class="alert alert-error-light d-flex align-items-center p-2">
                      <div class="alert-icon m-1 p-3">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <div class="alert-message">
                        <h5 class="message-title text-p m-0 p-0">
                          The email you entered is incorrect
                        </h5>
                        <p class="text">
                          Please ensure your email is correct, and
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
                      <i class="fa-solid fa-envelope z-0"></i>
                    </div>

                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-input">
                    <label htmlFor="password" className="ms-2">
                      Enter your New Password:
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
                      <i class="fa-solid fa-key"></i>
                    </div>

                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.newPassword}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="m-1">
                    <div className="form-input ">
                      {isLoading ? (
                        <button className="btn primary-btn  ">
                          <section class="dots-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                          </section>
                        </button>
                      ) : (
                        <div className="d-block">
                          <button
                            className="btn primary-btn col-12"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Reset password
                          </button>

                      
                        </div>
                      )}
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
