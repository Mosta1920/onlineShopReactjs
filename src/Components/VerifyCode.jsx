import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const BaseUrl = `https://ecommerce.routemisr.com`;

  let { setUserToken } = useContext(UserContext);

  let validationSchema = Yup.object({
    code: Yup.string().required("code is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function verifyCode(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`${BaseUrl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        seterror(err.response.data.message);
        setisLoading(false);
      });

    if (data.status === "success") {
      navigate("/onlineShopReactjs/reset-password");
      setisLoading(false);
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
    }
  }

  let formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });

  return (
    <>
      <Helmet>
        <title>Verify Code - Online shop</title>
      </Helmet>

      <section className="login jump mt-5 mb-5 vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 m-4 p-4 ">
              <form onSubmit={formik.handleSubmit}>
                <div className="signin-form-two form-style-two">
                  {error !== null ? (
                    <div class="alert alert-error-light d-flex align-items-center p-2">
                      <div class="alert-icon m-1 p-3">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <div class="alert-message">
                        <h5 class="message-title text-p m-0 p-0">
                          The Code you entered is False.
                        </h5>
                        <p class="text">
                          Please ensure your Code is correct, and try again
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="form-input m-0">
                    <label htmlFor="code" className="ms-2">
                      Enter your code:
                    </label>
                    <div className="input-items default ">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.code}
                        name="code"
                        id="code"
                        type="text"
                        className="fw-bold text-grey "
                        placeholder="code"
                      />
                      <i class="fa-solid fa-envelope-circle-check"></i>{" "}
                    </div>

                    {formik.touched.code && formik.errors.code ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.code}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="m-1">
                    <div className="form-input ">
                      {isLoading ? (
                        <button className="btn primary-btn">
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
                            Verify Code
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
