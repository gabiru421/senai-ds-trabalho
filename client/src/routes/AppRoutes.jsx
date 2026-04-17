// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";

import Dashboard from "../pages/dashboard/Dashboard.jsx";
// import Users from "../pages/users/UserList";
// import Products from "../pages/products/ProductList";
// import Sales from "../pages/sales/SalesList";
// import Reports from "../pages/reports/Reports";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="reports" element={<Reports />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}