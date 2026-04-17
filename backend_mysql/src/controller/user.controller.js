import { db } from "../connection/db.js";

// 🔍 LISTAR
export const getAllUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// ➕ CRIAR
export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios (`nome`, `login`, `senha`, `tipo`, `ativo`) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.nome,
    req.body.login,
    req.body.senha,
    req.body.tipo || "caixa",
    req.body.ativo ?? 1,
  ];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

// ✏️ ATUALIZAR
export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome`=?, `login`=?, `senha`=?, `tipo`=?, `ativo`=? WHERE `idusuarios`=?";

  const values = [
    req.body.nome,
    req.body.login,
    req.body.senha,
    req.body.tipo,
    req.body.ativo,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

// ❌ DELETAR
export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idusuarios` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};