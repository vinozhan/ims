import { getUserRole } from "../../utils/auth";
import { deleteProduct } from "./productService";

export default function ProductList({ products, onDelete, loading }) {
  const role = getUserRole();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    onDelete(); // 🔥 refresh list
  };
  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div className="mt-6">
      {products.length === 0 && (
        <p className="text-gray-500">No products found</p>
      )}

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>
              {p.name} ({p.quantity}) - Rs.{p.price}
            </span>
            {role === "ADMIN" && (
              <button onClick={() => handleDelete(p.id)} className="text-red-600">
              Delete
            </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
