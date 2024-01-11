"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import React from "react";
import axios from "axios";

// const validationSchema = Yup.object().shape({
//   emp_name: Yup.string().required("Employee Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   department: Yup.string().required("Department is required"),
//   phone_number: Yup.string().required("Phone Number is required"),
//   emp_address: Yup.string().required("Address is required"),
//   emp_age: Yup.string().required("Age is required"),
//   no_of_experience: Yup.string().required("Experience is required"),
// });

const CreateEmployee = () => {
  const departments = ["HR", "Finance", "IT", "Marketing", "Operations"];
  const exp = ["0-1 exp", "1-3 exp", "3-5 exp", "5+ exp"];

  const initialValues = {
    emp_name: "",
    email: "",
    department: "",
    phone_number: "",
    emp_address: "",
    emp_age: "",
    no_of_experience: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form Values:", values);
      const config = {
        url: `http://localhost:9000/employee/create-emp`,
        method: "post",
        data: values,
      };
      axios(config).then((res) => {
        const data = res.data;
        console.log("data", data);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  

  const formik = useFormik({
    initialValues,
    
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Employee
          </h2>
          <form onSubmit={formik.handleSubmit}>
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
        
            <select
              id="department"
              name="department"
              className="border border-gray-300 p-2 rounded-md w-full mb-4 bg-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department} 
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
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
 
            <select
              id="no_of_experience"
              name="no_of_experience"
              className="border border-gray-300 p-2 rounded-md w-full mb-4 bg-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.no_of_experience}
            >
              {exp.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 flex justify-center items-center "
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;