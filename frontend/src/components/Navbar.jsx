import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        {/* ADMIN only */}
        {role === "ADMIN" && <Link to="/products">Products</Link>}

        {/* ADMIN + CASHIER */}
        <Link to="/billing">Billing</Link>
      </div>

      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
