import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .max(50, "Full Name can't exceed 50 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const user = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful!");
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block font-medium">
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block font-medium">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
