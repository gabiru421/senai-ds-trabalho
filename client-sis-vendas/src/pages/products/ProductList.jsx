import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 11",
      stock: 10,
      min: 5,
      max: 30,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    stock: "",
    min: "",
    max: "",
  });

  // abrir modal
  const handleOpen = (product = null) => {
    if (product) setForm(product);
    else
      setForm({
        id: null,
        name: "",
        stock: "",
        min: "",
        max: "",
      });

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // salvar (create/update)
  const handleSave = () => {
    const formatted = {
      ...form,
      stock: Number(form.stock),
      min: Number(form.min),
      max: Number(form.max),
    };

    if (form.id) {
      setProducts(products.map((p) => (p.id === form.id ? formatted : p)));
    } else {
      setProducts([
        ...products,
        { ...formatted, id: Date.now() },
      ]);
    }

    handleClose();
  };

  // deletar
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // status estoque
  const getStatus = (row) => {
    if (row.stock < row.min)
      return <Chip label="Baixo" color="error" size="small" />;

    if (row.stock > row.max)
      return <Chip label="Alto" color="warning" size="small" />;

    return <Chip label="Normal" color="success" size="small" />;
  };

  const columns = [
    { field: "name", headerName: "Produto", flex: 1 },

    { field: "stock", headerName: "Estoque", flex: 1 },

    { field: "min", headerName: "Mínimo", flex: 1 },

    { field: "max", headerName: "Máximo", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => getStatus(params.row),
    },

    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Produtos
      </Typography>

      <Button variant="contained" onClick={() => handleOpen()}>
        Novo Produto
      </Button>

      <Box mt={2} style={{ height: 400 }}>
        <DataGrid rows={products} columns={columns} />
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            {form.id ? "Editar Produto" : "Novo Produto"}
          </Typography>

          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Estoque"
            type="number"
            margin="normal"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Estoque mínimo"
            type="number"
            margin="normal"
            value={form.min}
            onChange={(e) =>
              setForm({ ...form, min: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Estoque máximo"
            type="number"
            margin="normal"
            value={form.max}
            onChange={(e) =>
              setForm({ ...form, max: e.target.value })
            }
          />

          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose}>Cancelar</Button>

            <Button variant="contained" onClick={handleSave}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}