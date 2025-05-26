// src/pages/LoginPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/bmi");
    } else {
      alert("Invalid email or password");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-3xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row">
        {/* Welcome Panel */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center p-10 bg-gradient-to-tr from-purple-600 to-blue-400 text-white space-y-4">
          <FaUserCircle className="text-6xl" />
          <h3 className="text-2xl font-semibold">Welcome Back!</h3>
          <p className="text-center opacity-80">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Form Panel */}
        <div className="flex-1 p-8 md:p-16">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center md:text-left">
            Log In
          </h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Logging In..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
