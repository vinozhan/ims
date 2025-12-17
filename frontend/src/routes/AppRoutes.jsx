import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
