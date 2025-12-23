import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function AdminRoute({ children }) {
  const role = getUserRole();

  if (role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
