import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login(form);
      localStorage.setItem("token", res.token); // 🔐 save JWT
      navigate("/home"); // redirect after login
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

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
        <button className="bg-blue-600 text-white w-full py-2">Login</button>
      </form>
    </div>
  );
}
