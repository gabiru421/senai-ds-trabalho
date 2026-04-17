// src/components/layout/Header.jsx
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ toggle }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "#fff", color: "#000" }}
    >
      <Toolbar>
        <IconButton onClick={toggle}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ ml: 2 }}>
          Sistema de Vendas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}