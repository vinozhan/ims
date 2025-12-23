import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  //return token ? children : <Navigate to="/login" replace />;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );

}
