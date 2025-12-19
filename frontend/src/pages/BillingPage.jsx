import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/productService";
import api from "../api/axios";

export default function BillingPage() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetchProducts();
      setProducts(res.data);
    };
    loadProducts();
  }, []);

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };


  const addItem = (productId) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const increaseQty = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const submitInvoice = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/invoices", { items });
      setInvoice(res.data);
      setItems([]);
    } catch (err) {
      if (err.response) {
        // Backend responded with error
        const status = err.response.status;

        if (status === 400) {
          setError("Invalid invoice data. Please check quantities.");
        } else if (status === 404) {
          setError("One of the selected products no longer exists.");
        } else {
          setError("Failed to create invoice. Please try again.");
        }
      } else {
        setError("Network error. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      {/* Products */}
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>
              {p.name} - Rs.{p.price}
            </span>
            <button
              onClick={() => addItem(p.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Selected Items</h2>

          <ul className="space-y-2">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                // <li
                //   key={item.productId}
                //   className="flex justify-between items-center border p-3 rounded"
                // >
                //   <span>
                //     {product.name} × {item.quantity}
                //   </span>
                // </li>
                <li
                  key={item.productId}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{product.name}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.productId)}
                      className="px-2 bg-gray-200 rounded"
                      disabled={loading}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.productId)}
                      className="px-2 bg-gray-200 rounded"
                      disabled={loading}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-2 text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )
      }

      {/* Submit */}
      <button
        disabled={loading || items.length === 0}
        onClick={submitInvoice}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Invoice..." : "Create Invoice"}
      </button>
      {/* Invoice Result */}
      {invoice && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="font-bold">Invoice Created</h2>
          <p>Invoice No: {invoice.invoiceNumber}</p>
          <p>Total: Rs.{invoice.totalAmount}</p>
        </div>
      )}
    </div>
  );
}
