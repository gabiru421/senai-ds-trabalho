import { db } from "../connection/db.js";

// 🔍 LISTAR PRODUTOS
export const getAllProduto = (_, res) => {
  console.log("getAllProduto");

  const q = "SELECT * FROM produto";

  db.query(q, (err, data) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

//  CRIAR PRODUTO
export const addProduto = (req, res) => {
  console.log("addProduto");

  const q =
    "INSERT INTO produto (`nome`, `codigo_barras`, `preco`, `estoque`, `ativo`) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.nome,
    req.body.codigo_barras,
    req.body.preco,
    req.body.estoque,
    req.body.ativo,
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json(err);
    }

    return res.status(201).json("Produto criado com sucesso.");
  });
};

// ATUALIZAR PRODUTO
export const updateProduto = (req, res) => {
  console.log("updateProduto");

  const q =
    "UPDATE produto SET `nome` = ?, `codigo_barras` = ?, `preco` = ?, `estoque` = ?, `ativo` = ?, `criado_em` = ? WHERE `idprodutos` = ?";

  const values = [
    req.body.nome,
    req.body.codigo_barras,
    req.body.preco,
    req.body.estoque,
    req.body.ativo,
    req.body.criado_em,
  ];

  db.query(q, [...values, req.params.idprodutos], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

//  DELETAR PRODUTO
export const deleteProduto = (req, res) => {
  console.log("deleteProduto");

  const { idprodutos } = req.params;

  const q = "DELETE FROM produto WHERE idprodutos = ?";

  db.query(q, [idprodutos], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Produto deletado com sucesso.");
  });
};