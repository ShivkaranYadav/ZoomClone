import { useNavigate } from "react-router-dom";
import useLogOutListener from "../../layout/useLogOutListener";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  useLogOutListener();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getScheduleMeeting/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response?.data?.status) {
          setMeeting(response?.data?.result || []);
        } else {
          toast.error("No meetings available");
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
        toast.error("Failed to fetch meetings");
      }
    };

    if (id) fetchMeetings();
  }, [id]);

  const handleRoomJoin = () => {
    const roomId = Math.floor(Math.random() * 10000).toString();
    navigate(`/room/${roomId}`);
  };

  const handleJoinMeeting = () => {
    navigate("/joinMeeting");
  };

  const handleScheduleMeeting = () => {
    navigate("/scheduleMeeting");
  };

  const handleLogout = () => {
    localStorage.setItem("logout", Date.now().toString());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-between bg-gray-900 text-white min-h-screen p-6">
      <div className="w-full flex justify-end mb-8">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 font-bold rounded-md hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl sm:text-6xl font-bold">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="text-sm sm:text-lg mt-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Meeting List */}
      <div className="bg-gray-700 text-center p-4 rounded-md mb-8 max-w-md w-full">
        {meeting.length > 0 ? (
          meeting.map((value) => (
            <div
              key={value._id}
              className="p-1 mb-2 border-b border-gray-500 text-left flex items-center justify-between"
            >
              <p className="text-sm">
                Upcoming meeting : {value.date} at {value.time} AM
              </p>
              <button
                className="px-4 py-2 rounded-xl bg-green-600 font-bold hover:bg-green-400"
                onClick={() => navigate(`/room/${value._id}`)}
              >
                Join
              </button>
            </div>
          ))
        ) : (
          <p>No meetings scheduled</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 w-full justify-center">
        <div
          onClick={handleRoomJoin}
          className="flex flex-col items-center bg-orange-500 hover:bg-orange-400 text-white p-6 rounded-xl shadow-lg cursor-pointer w-full sm:w-48"
        >
          <span className="font-bold text-lg sm:text-xl">New Meeting</span>
        </div>
        <div
          className="flex flex-col items-center bg-blue-500 hover:bg-blue-400 text-white p-6 rounded-xl shadow-lg cursor-pointer w-full sm:w-48"
          onClick={handleJoinMeeting}
        >
          <span className="font-bold text-lg sm:text-xl">Join Meeting</span>
        </div>
        <div
          className="flex flex-col items-center bg-purple-600 hover:bg-purple-500 text-white p-6 rounded-xl shadow-lg cursor-pointer w-full sm:w-48"
          onClick={handleScheduleMeeting}
        >
          <span className="font-bold text-lg sm:text-xl">Schedule Meeting</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
