import { useEffect, useState } from "react";
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

import api from "../../services/api";
import Toast from "../../components/ui/Toast";

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
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([
    {
      nome: "",
      codigo_barras: "",
      preco: "",
      estoque: "",
      min: "",
      max: "",
      ativo: true,
    },
  ]);
  
  const fetchProducts = async () => {
    try {
      const res = await api.get("/produto");
      setRows(res.data)
      console.log(res.data)
    } catch {
      // showToast("Erro ao buscar produtos", "error");
      console.error("Erro ao buscar produtos", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    idproduto: null,
    nome: "",
    codigo_barras: "",
    preco: "",
    estoque: "",
    min: "",
    max: "",
    ativo: true,
  });

  // abrir modal
  const handleOpen = (product = null) => {
    if (product) setForm(product);
    else
      setForm({
        idproduto: null,
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
      preco: Number(form.preco),
      estoque: Number(form.estoque),
      min: Number(form.min),
      max: Number(form.max),
    };
  
    if (form.id) {
      setProducts(products.map((p) => (p.id === form.id ? formatted : p)));
    } else {
      setProducts([...products, { ...formatted, id: Date.now() }]);
    }
  
    handleClose();
  };
  // deletar
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleCreate = async () => {
    try {
      await api.post("/produto", newUser);
      showToast("Produto criado com sucesso");
      setOpenCreateModal(false);
      setNewUser({
        nome: "",
        codigo_barras: "",
        preco: "",
        estoque: "",
        min: "",
        max: "",
        ativo: true,
      });
      fetchUsers();
    } catch {
      showToast("Erro ao criar usuário", "error");
    }
  };

  // status estoque
  const getStatus = (row) => {
    if (row.estoque < row.min)
      return <Chip label="Baixo" color="error" size="small" />;
  
    if (row.estoque > row.max)
      return <Chip label="Alto" color="warning" size="small" />;
  
    return <Chip label="Normal" color="success" size="small" />;
  };
  
  const columns = [
    { field: "nome", headerName: "Produto", flex: 1 },

    { field: "codigo_barras", headerName: "Codigo Barras", flex: 1 },

    { field: "preco", headerName: "Preço", flex: 1 },

    { field: "estoque", headerName: "Estoque", flex: 1 },
    
    { field: "ativo", headerName: "ativo", flex: 1 },

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
        <DataGrid rows={rows}
        columns={columns}
        getRowId={(row) => row.idprodutos}
        />

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

<TextField
  fullWidth
  label="Nome"
  margin="normal"
  value={form.nome}
  onChange={(e) =>
    setForm({ ...form, nome: e.target.value })
  }
/>

<TextField
  fullWidth
  label="Código de Barras"
  margin="normal"
  value={form.codigo_barras}
  onChange={(e) =>
    setForm({ ...form, codigo_barras: e.target.value })
  }
/>

<TextField
  fullWidth
  label="Preço"
  type="number"
  margin="normal"
  value={form.preco}
  onChange={(e) =>
    setForm({ ...form, preco: e.target.value })
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