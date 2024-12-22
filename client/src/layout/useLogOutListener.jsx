import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogOutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginLogout = (event) => {
      if (event.key === "logout" && event.newValue) {
        localStorage.removeItem("token");
        localStorage.removeItem("logout");
        navigate("/");
      }
    };

    window.addEventListener("storage", handleLoginLogout);

    return () => {
      window.removeEventListener("storage", handleLoginLogout);
    };
  }, [navigate]);
};

export default useLogOutListener;
