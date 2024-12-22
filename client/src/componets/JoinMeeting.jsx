import { useState } from "react";

const JoinMeeting = () => {
  const [link, setLink] = useState("");
  const handleJoinMeeting = () => {
    window.location.href = link;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Join a Meeting</h1>

        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <label
            htmlFor="meeting-link"
            className="block text-sm font-medium mb-2"
          >
            Meeting Link
          </label>
          <input
            type="text"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            required
            placeholder="Enter the meeting link"
            className="w-full p-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleJoinMeeting}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </>
  );
};

export default JoinMeeting;
