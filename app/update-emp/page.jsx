"use client";

import { useFormik } from "formik";

import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useSearchParams, useRouter } from "next/navigation";

const UpdateEmployee = ({ userId }) => {
  const router = useRouter();
  const params = useParams();
  const serachParms = useSearchParams();
  const id = serachParms.get("id");

  console.log("id", serachParms.get("id"));

  const departments = ["HR", "Finance", "IT", "Marketing", "Operations"];
  const exp = ["0-1 exp", "1-3 exp", "3-5 exp", "5+ exp"];

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/employee/get-single-user/${id}`
      );
      const userData = response.data.user;
      console.log(userData, "user");
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [user, setUser] = useState();
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values:", values);
      const config = {
        url: `http://localhost:9000/employee/update-emp/${id}`,
        method: "put",
        data: values,
      };

      const res = await axios(config);
      const data = res.data;
      console.log("data", data);
      fetchUser();

      setSuccessMessage("Employee Updated Successfully");
      setTimeout(() => {
        formik.resetForm();
        setSuccessMessage(null);
      }, 3000);
      router.push("/view-all-emp");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      emp_name: user ? user.emp_name : "",
      email: user ? user.email : "",
      department: user ? user.department : "",
      phone_number: user ? user.phone_number : "",
      emp_address: user ? user.emp_address : "",
      emp_age: user ? user.emp_age : "",
      no_of_experience: user ? user.no_of_experience : "",
    },
    validationSchema: Yup.object().shape({
      emp_name: Yup.string().required("Employee Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      department: Yup.string().required("Department is required"),
      phone_number: Yup.number().required("Phone Number is required"),
      emp_address: Yup.string().required("Address is required"),
      emp_age: Yup.string().required("Age is required"),
      no_of_experience: Yup.string().required("Experience is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Update Employee
          </h2>
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          <form onSubmit={formik.handleSubmit}>
            {formik.touched.emp_name && formik.errors.emp_name && (
              <div className="text-red-500">{formik.errors.emp_name}</div>
            )}
            <input
              placeholder="Employee Name"
              type="text"
              id="emp_name"
              name="emp_name"
              className="border border-gray-300 bg-white p-2 rounded-md w-full mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emp_name}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.department && formik.errors.department && (
              <div className="text-red-500">{formik.errors.department}</div>
            )}
            <select
              id="department"
              name="department"
              className="border border-gray-300 p-2 rounded-md w-full mb-4 bg-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="text-red-500">{formik.errors.phone_number}</div>
            )}
            <input
              placeholder="Phone Number"
              type="text"
              id="phone_number"
              name="phone_number"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
            />
            {formik.touched.emp_address && formik.errors.emp_address && (
              <div className="text-red-500">{formik.errors.emp_address}</div>
            )}
            <input
              placeholder="Address"
              type="text"
              id="emp_address"
              name="emp_address"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emp_address}
            />
            {formik.touched.emp_age && formik.errors.emp_age && (
              <div className="text-red-500">{formik.errors.emp_age}</div>
            )}
            <input
              placeholder="Age"
              type="text"
              id="emp_age"
              name="emp_age"
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emp_age}
            />

            {formik.touched.no_of_experience && formik.no_of_experience && (
              <div className="text-red-500">
                {formik.errors.no_of_experience}
              </div>
            )}

            <select
              id="no_of_experience"
              name="no_of_experience"
              className="border border-gray-300 p-2 rounded-md w-full mb-4 bg-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.no_of_experience}
            >
              <option value="" disabled>
                Select Experience
              </option>

              {exp.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            <button
              justifycontent="center"
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 mx-auto flex justify-center items-center "
            >
              Upadate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
