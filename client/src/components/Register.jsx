import { useFormik } from "formik";
import { signupValidation } from "./SignupValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { VITE_BACKEND_URL } from "../App";

const initialValues = {
  studentid: "",
  name: "",
  course: "",
  yearandsection: "",
  email: "",
  password: "",
  confirmpassword: "",
};

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      console.log(values);

      try {
        setIsLoading(true);
        const response = await axios.post(
          `${VITE_BACKEND_URL}/api/register`,
          values
        );
        toast.success(`Save ${response.data.name} successfully`);
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4 font-semibold">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentid">
              Student ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentid"
              type="text"
              placeholder="Enter Student ID Number"
              name="studentid"
              value={values.studentid}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.studentid && <p className="text-red-500 text-xs italic">{errors.studentid}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
              Course
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="course"
              type="text"
              placeholder="Enter Course Name"
              name="course"
              value={values.course}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.course && <p className="text-red-500 text-xs italic">{errors.course}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearandsection">
              Year & Section
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="yearandsection"
              type="text"
              placeholder="Enter Year and Section"
              name="yearandsection"
              value={values.yearandsection}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.yearandsection && <p className="text-red-500 text-xs italic">{errors.yearandsection}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={values.confirmpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.confirmpassword && <p className="text-red-500 text-xs italic">{errors.confirmpassword}</p>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a className="text-blue-500 hover:text-blue-700" href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
