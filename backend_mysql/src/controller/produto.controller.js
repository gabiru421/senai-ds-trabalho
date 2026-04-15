import { db } from "../connection/db.js";

export const getAllProduto = (_, res) => {
    console.log("getAllProduto");

    const q = "SELECT * FROM produto";

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    });
}


export const addProduto = (req, res) => {
  console.log("addProduto");
  const q =
    "INSERT INTO produto(`nome`, `codigo_barra`, `preco_venda` , `estoque`, `ativo`, `criado_em`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.codigo_barra,
    req.body.preco_venda,
    req.body.estoque,
    req.body.ativo,
    req.body.criado_em,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto criado com sucesso.");
  });
};



export const updateProduto = (req, res) => {
  console.log("updateProduto");
  const q =
    "UPDATE users SET `nome` = ?, `codigo_barra` = ?, `preco_venda` = ? , `estoque` = ?, `ativo` = ?, `criado_em` = ? WHERE `idproduto` = ?";

  const values = [
    req.body.nome,
    req.body.codigo_barra,
    req.body.preco_venda,
    req.body.estoque,
    req.body.ativo,
    req.body.criado_em,
  ];

  db.query(q, [...values, req.params.idproduto], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};


export const deleteProduto = (req, res) => {
  console.log("deleteProduto");
  const q = "DELETE FROM produto WHERE `idproduto` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};