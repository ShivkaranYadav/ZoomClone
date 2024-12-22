import { Route, Routes } from "react-router-dom";
import Login from "./pages/user-login/Login";
import Register from "./pages/user-register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ZoomMeeting from "./componets/ZoomMeeting";
import "./index.css";
import ProtectedLayout from "./layout/ProtectedLayout";
import JoinMeeting from "./componets/JoinMeeting";
import ScheduleMeeting from "./componets/ScheduleMeeting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:roomId" element={<ZoomMeeting />} />
        <Route path="/joinMeeting" element={<JoinMeeting />} />
        <Route path="/scheduleMeeting" element={<ScheduleMeeting />} />
      </Route>
    </Routes>
  );
}

export default App;
