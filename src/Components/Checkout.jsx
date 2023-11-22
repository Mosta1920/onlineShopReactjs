import React, { useContext , useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContext";

export default function Checkout() {

  let { onlinePayment, cartId } = useContext(cartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, `https://mosta1920.github.io/onlineShopReactjs/`, values);
    window.location.href = response?.data.session.url;
  }

  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validationSchema = Yup.object({
    details: Yup.string().required("details is required"),

    phone: Yup.string()
      .matches(phoneRegExp, "Your phone number is not valid")
      .required("Phone is required"),

    city: Yup.string().required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout - Online shop</title>
      </Helmet>

      <section className="login jump">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 m-4 p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="signin-form-two form-style-two light ">
                  <div className="form-input m-0">
                    <label htmlFor="details" className="ms-2">
                      Enter your details:
                    </label>
                    <div className="input-items default ">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        name="details"
                        id="details"
                        type="text"
                        className="fw-bold text-grey"
                        placeholder="details"
                      />
                      <i class="fa-solid fa-circle-info"></i>
                    </div>

                    {formik.touched.details && formik.errors.details ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.details}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-input">
                    <label htmlFor="phone" className="ms-2">
                      Enter your phone:
                    </label>
                    <div className="input-items default">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        id="phone"
                        type="tel"
                        placeholder="phone"
                        className="fw-bold text-grey"
                        to
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
                  </div>

                  <div className="form-input">
                    <label htmlFor="city" className="ms-2">
                      Enter your city:
                    </label>
                    <div className="input-items default">
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        id="city"
                        type="tel"
                        placeholder="city"
                        className="fw-bold text-grey"
                        to
                      />
                      <i class="fa-solid fa-city"></i>
                    </div>

                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-danger fw-semibold mt-1">
                        <i class="fa-solid fa-circle-xmark mx-1 text-center"></i>
                        {formik.errors.city}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6 m-1">
                    <div className="form-input">
                      <button
                        className="btn primary-btn"
                        type="submit"
                      >
                        Pay Now
                      </button>
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
