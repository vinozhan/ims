import { useEffect, useState, useCallback } from "react";
import ProductList from "../features/products/ProductList";
import ProductForm from "../features/products/ProductForm";
import { fetchProducts } from "../features/products/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductForm onProductAdded={loadProducts} />
      <ProductList
        products={products}
        loading={loading}
        onDelete={loadProducts}
      />
    </div>
  );
}
