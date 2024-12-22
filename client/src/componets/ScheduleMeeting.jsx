import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleMeeting = () => {
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const authorId = user._id;

  const [details, setDetails] = useState({
    title: "",
    date: "",
    time: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSchedule = async (e) => {
    e.preventDefault();

    const { title, date, time } = details;

    if (!title || !date || !time) {
      toast.error("All fields are required");
      return;
    }

    if (new Date(date) < new Date()) {
      toast.error("Cannot select a past date");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/scheduleMeeting",
        { details, authorId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.data?.status) {
        toast.success(response?.data?.message);
        setDetails({
          title: "",
          date: "",
          time: "",
        });
        navigator("/dashboard");
      } else {
        toast.error(response?.data?.message || "Failed to schedule meeting");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Schedule Meeting</h1>

      <div className="bg-slate-700 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Description:
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={details.title}
            placeholder="Enter description"
            className="w-full px-4 py-2 bg-slate-800 text-white rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Date:
          </label>
          <input
            type="date"
            onChange={handleChange}
            name="date"
            value={details.date}
            min={today}
            className="w-full px-4 py-2 bg-slate-800 text-white rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium mb-2">
            Duration:
          </label>
          <select
            name="time"
            onChange={handleChange}
            value={details.time}
            className="w-full px-4 py-2 bg-slate-800 text-white rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Time</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="2">2 </option>
            <option value="3">3 </option>
          </select>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={handleSchedule}
          >
            Schedule Meeting
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ScheduleMeeting;
