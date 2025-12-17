import { useState } from "react";
import { createProduct } from "./productService";

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset

    try {
      await createProduct({
        name: form.name,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });

      setForm({ name: "", quantity: "", price: "" });
      onProductAdded(); // 🔥 refresh list
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data.messages);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      <input
        className="border p-2"
        placeholder="Qty"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      {errors.quantity && (
        <p className="text-red-600 text-sm">{errors.quantity}</p>
      )}
      <input
        className="border p-2"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
      <button className="bg-blue-600 text-white px-4">Add</button>
    </form>
  );
}
