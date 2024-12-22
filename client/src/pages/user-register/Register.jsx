import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/userRegister`,
        inputs,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.data?.status) {
        toast.success(response?.data?.message);
        setInputs("");
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        className="bg-gray-800 p-6 shadow-md w-full max-w-md space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 pb-4 rounded-md border border-gray-700"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-medium text-green-500 text-center">
          Sign Up for ZoomClone
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-400 block mb-2 text-left"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              className="
                border-2 outline-none text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2
                bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300
              "
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-400 block mb-2 text-left"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="
                border-2 outline-none text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2
                bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300
              "
              placeholder="shiv@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-400 block mb-2 text-left"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="
                border-2 outline-none text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2
                bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300
              "
              placeholder="Create a password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700"
        >
          Register
        </button>

        <div className="text-sm font-medium text-gray-400 text-center">
          Already have an account?{" "}
          <a href="/" className="text-green-500 hover:underline">
            Login
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
