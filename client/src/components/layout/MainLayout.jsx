// src/components/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} />

      <Box sx={{ flex: 1 }}>
        <Header toggle={() => setOpen(!open)} />

        <Box sx={{ p: 3, background: "#f4f6f8", minHeight: "100vh" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}