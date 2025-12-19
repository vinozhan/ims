import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import BillingPage from "../pages/BillingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/billing" element={<BillingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
