import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserManagement() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CASHIER",
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await api.post("/users", form);
      setMessage("User created successfully");
      setForm({ username: "", password: "", role: "CASHIER" });
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You are not authorized to perform this action");
      } else {
        setError("Failed to create user");
      }
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      setError("Failed to load users");
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await api.patch(`/users/${userId}/toggle-status`);
      loadUsers();
    } catch {
      setError("Failed to update user status");
    }
  };

  useEffect(() => {
    (async () => {
      await loadUsers();
    })();
  }, []);

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.enabled ? "Active" : "Disabled"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleUserStatus(u.id)}
                  className="text-blue-600"
                >
                  {u.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="CASHIER">Cashier</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
}
