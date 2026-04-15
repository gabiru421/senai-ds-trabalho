import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Tooltip,
  Button,
  Box,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../../services/api";
import Toast from "../../components/ui/Toast";

export default function UserList() {
  const [rows, setRows] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // 🆕 novo usuário
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: "",
    login: "",
    senha: "",
    tipo: "caixa",
    ativo: true,
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setRows(res.data);
    } catch {
      showToast("Erro ao buscar usuários", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✏️ editar
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${selectedUser.idusuarios}`, selectedUser);
      showToast("Usuário atualizado com sucesso");
      setOpenModal(false);
      fetchUsers();
    } catch {
      showToast("Erro ao atualizar usuário", "error");
    }
  };

  // ❌ delete
  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/users/${userToDelete.idusuarios}`);
      showToast("Usuário deletado com sucesso");
      setOpenDeleteModal(false);
      fetchUsers();
    } catch {
      showToast("Erro ao deletar usuário", "error");
    }
  };

  // 🆕 criar usuário
  const handleCreate = async () => {
    try {
      await api.post("/users", newUser);
      showToast("Usuário criado com sucesso");
      setOpenCreateModal(false);
      setNewUser({
        nome: "",
        login: "",
        senha: "",
        tipo: "caixa",
        ativo: true,
      });
      fetchUsers();
    } catch {
      showToast("Erro ao criar usuário", "error");
    }
  };

  const columns = [
    { field: "idusuarios", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "login", headerName: "Login", flex: 1 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    {
      field: "ativo",
      headerName: "Ativo",
      flex: 1,
      renderCell: (params) => (params.value ? "Sim" : "Não"),
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Excluir">
            <IconButton
              onClick={() => handleOpenDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      {/* 🆕 Botão novo usuário */}
      <Box mb={2}>
        <Typography variant="h5" mb={2}>
        Usuários
      </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenCreateModal(true)}
        >
          Novo Usuário
        </Button>
      </Box>

      <div style={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.idusuarios}
        />
      </div>

      {/* ✏️ Modal edição */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Editar Usuário</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={selectedUser?.nome || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, nome: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Login"
            fullWidth
            value={selectedUser?.login || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, login: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Senha"
            fullWidth
            value={selectedUser?.senha || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, senha: e.target.value })
            }
          />

          <TextField
            select
            margin="dense"
            label="Tipo"
            fullWidth
            value={selectedUser?.tipo || "caixa"}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, tipo: e.target.value })
            }
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="caixa">Caixa</MenuItem>
          </TextField>

          <FormControlLabel
            control={
              <Switch
                checked={!!selectedUser?.ativo}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    ativo: e.target.checked ? 1 : 0,
                  })
                }
              />
            }
            label="Ativo"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleUpdate} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🆕 Modal criar */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Novo Usuário</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={newUser.nome}
            onChange={(e) =>
              setNewUser({ ...newUser, nome: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Login"
            fullWidth
            value={newUser.login}
            onChange={(e) =>
              setNewUser({ ...newUser, login: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Senha"
            fullWidth
            value={newUser.senha}
            onChange={(e) =>
              setNewUser({ ...newUser, senha: e.target.value })
            }
          />

          <TextField
            select
            margin="dense"
            label="Tipo"
            fullWidth
            value={newUser.tipo}
            onChange={(e) =>
              setNewUser({ ...newUser, tipo: e.target.value })
            }
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="caixa">Caixa</MenuItem>
          </TextField>

          <FormControlLabel
            control={
              <Switch
                checked={newUser.ativo}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    ativo: e.target.checked,
                  })
                }
              />
            }
            label="Ativo"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Cancelar</Button>
          <Button onClick={handleCreate} variant="contained">
            Criar
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🗑️ Modal delete */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <DialogTitle>Confirmar exclusão</DialogTitle>

        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o usuário{" "}
            <strong>{userToDelete?.nome}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔔 Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}