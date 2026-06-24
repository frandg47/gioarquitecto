import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!authorized) return null;

  return children;
};

export default AdminGuard;
