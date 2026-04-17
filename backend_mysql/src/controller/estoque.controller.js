import { db } from "../connection/db.js";

export const getAllEstoque = (_, res) => {
    console.log("getAllEstoque");

    const q = "SELECT * FROM estoque";

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    });
}



export const addEstoque = (req, res) => {
  console.log("addEstoque");
  const q =
    "INSERT INTO estoque(`id_estoque`, `produto_id`, `tipo`, `quantidade`, `data_movimentacao`) VALUES(?)";

  const values = [
    req.body.id_estoque,
    req.body.produto_id,
    req.body.tipo,
    req.body.quantidade,
    req.body.data_movimentacao,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Estoque criado com sucesso.");
  });
};





export const updateEstoque = (req, res) => {
  console.log("updateEstoque");
  const q =
    "UPDATE estoque SET `id_estoque` = ?, `produto_id` = ?, `tipo` = ?, `quantidade` = ?, `data_movimentacao` = ? WHERE `id` = ?";

  const values = [
    req.body.id_estoque,
    req.body.produto_id,
    req.body.tipo,
    req.body.quantidade,
    req.body.data_movimentacao,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Estoque atualizado com sucesso.");
  });
};






export const deleteEstoque = (req, res) => {
  console.log("deleteEstoque");
  const q = "DELETE FROM estoque WHERE `id_estoque` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Estoque deletado com sucesso.");
  });
};