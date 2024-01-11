"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateEmployee = ({ userId }) => {
  const departments = ["HR", "Finance", "IT", "Marketing", "Operations"];
  const exp = ["0-1 exp", "1-3 exp", "3-5 exp", "5+ exp"];

  const [initialValues, setInitialValues] = useState({
    emp_name: "",
    email: "",
    department: "",
    phone_number: "",
    emp_address: "",
    emp_age: "",
    no_of_experience: "",
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form Values:", values);
      const config = {
        url: `http://localhost:9000/employee/update-emp/${userId}`,
        method: "put",
        data: values,
      };
      const res = await axios(config);
      const updatedUser = res.data.emp;

      console.log("Updated User:", updatedUser);

    } catch (error) {
      console.error("Error updating employee:", error);
      
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      emp_name: Yup.string().required("Employee Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      department: Yup.string().required("Department is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      emp_address: Yup.string().required("Address is required"),
      emp_age: Yup.string().required("Age is required"),
      no_of_experience: Yup.string().required("Experience is required"),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/employee/get-emp/${userId}`);
        const userData = response.data.emp;
        setInitialValues(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Update Employee
          </h2>
          <form onSubmit={formik.handleSubmit}>
           

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 flex justify-center items-center "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
