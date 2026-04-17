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

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    idprodutos: null,
    nome: "",
    codigo_barras: "",
    preco: "",
    estoque: "",
    ativo: true,
    criado_em: "",
  });

  // 🔄 Buscar produtos
  const fetchProducts = async () => {
    try {
      const res = await api.get("/produto");
      setRows(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🟢 Abrir modal
  const handleOpen = (product = null) => {
    if (product) {
      setForm(product);
    } else {
      setForm({
        idprodutos: null,
        nome: "",
        codigo_barras: "",
        preco: "",
        estoque: "",
        ativo: true,
        criado_em: "",
      });
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // 🚀 Criar produto
  const handleCreate = async () => {
    try {
      const newProduct = {
        nome: form.nome,
        codigo_barras: form.codigo_barras,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        ativo: form.ativo,
      };

      await api.post("/produto", newProduct);

      handleClose();
      fetchProducts();
    } catch (error) {
      console.error("Erro ao criar produto", error);
    }
  };

  // ✏️ Atualizar produto (local por enquanto)
  const handleSave = async () => {
    try {
      const updatedProduct = {
        nome: form.nome,
        codigo_barras: form.codigo_barras,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        ativo: form.ativo,
        criado_em: form.criado_em,
      };
  
      await api.put(`/produto/${form.idprodutos}`, updatedProduct);
  
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
    }
  };

  // ❌ Deletar (local por enquanto)
  const handleDelete = (id) => {
    setRows(rows.filter((p) => p.idprodutos !== id));
  };

  // 📊 Status do estoque
  const getStatus = (row) => {
    if (row.estoque <= 5)
      return <Chip label="Baixo" color="error" size="small" />;

    if (row.estoque >= 100)
      return <Chip label="Alto" color="warning" size="small" />;

    return <Chip label="Normal" color="success" size="small" />;
  };

  const columns = [
    { field: "nome", headerName: "Produto", flex: 1 },
    { field: "codigo_barras", headerName: "Código Barras", flex: 1 },
    { field: "preco", headerName: "Preço", flex: 1 },
    { field: "estoque", headerName: "Estoque", flex: 1 },
    {
      field: "ativo",
      headerName: "Ativo",
      flex: 1,
      renderCell: (params) =>
        params.value ? "Ativo" : "Inativo",
    },
    {
      field: "status",
      headerName: "Status Estoque",
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

          <IconButton
            onClick={() => handleDelete(params.row.idprodutos)}
          >
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
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.idprodutos}
        />
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            {form.idprodutos ? "Editar Produto" : "Novo Produto"}
          </Typography>

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
              setForm({
                ...form,
                codigo_barras: e.target.value,
              })
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

          <TextField
            fullWidth
            label="Estoque"
            type="number"
            margin="normal"
            value={form.estoque}
            onChange={(e) =>
              setForm({ ...form, estoque: e.target.value })
            }
          />

          <Box
            mt={2}
            display="flex"
            justifyContent="flex-end"
            gap={1}
          >
            <Button onClick={handleClose}>Cancelar</Button>

            <Button
              variant="contained"
              onClick={
                form.idprodutos ? handleSave : handleCreate
              }
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}