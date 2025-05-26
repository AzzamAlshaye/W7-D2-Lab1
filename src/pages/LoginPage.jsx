// src/pages/LoginPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  // Simple, in-line validation instead of Yup
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
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
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
