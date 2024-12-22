import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/userLogin`,
        inputs,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response?.data?.status) {
        toast.success(response.data.message);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/dashboard");
        setInputs("");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <form
        className="bg-gray-800 p-6 shadow-md w-full max-w-md space-y-6 rounded-md border border-gray-700 
                   sm:px-6 md:px-8 lg:px-12 pb-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-medium text-green-500 text-center">
          Sign In to ZoomClone
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 block mb-2 text-left"
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
              placeholder="shiv@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300 block mb-2 text-left"
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
              placeholder="*******"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700"
        >
          Sign In
        </button>

        <div className="text-sm font-medium text-gray-400 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Register
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
