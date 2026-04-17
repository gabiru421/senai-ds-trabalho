// src/components/layout/Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import BarChartIcon from "@mui/icons-material/BarChart";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;
const collapsedWidth = 70;

export default function Sidebar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Usuários", icon: <PeopleIcon />, path: "/users" },
    { text: "Produtos", icon: <InventoryIcon />, path: "/products" },
    { text: "Vendas", icon: <PointOfSaleIcon />, path: "/sales" },
    { text: "Relatórios", icon: <BarChartIcon />, path: "/reports" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "0.3s",
          overflowX: "hidden",
          background: "#111827",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <strong>{open ? "Sistemas de Vendas" : "SV"}</strong>
      </Toolbar>

      <List>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                background: isActive ? "#1f2937" : "transparent",
                "&:hover": { background: "#1f2937" },
                borderRadius: "8px",
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>

              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}