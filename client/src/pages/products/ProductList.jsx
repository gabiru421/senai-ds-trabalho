// src/pages/products/ProductList.jsx
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, name: "Produto A", estoque: 10 },
  { id: 2, name: "Produto B", estoque: 50 },
];

const columns = [
  { field: "name", headerName: "Produto", flex: 1 },
  { field: "estoque", headerName: "Estoque", flex: 1 },
];

export default function ProductList() {
  return (
    <div style={{ height: 400 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}