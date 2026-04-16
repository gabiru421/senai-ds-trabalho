import { db } from "../connection/db.js";

export const getAllVendas = (_, res) => {
    console.log("getAllVendas");

    const q = "SELECT * FROM vendas";

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    });
}



export const addVendas = (req, res) => {
  console.log("addVendas");
  const q =
    "INSERT INTO vendas(`idvendas`, `usuario_id`, `total`, `desconto`, `data_venda`, `produtoID`) VALUES(?)";

  const values = [
    req.body.usuario_id,
    req.body.total,
    req.body.desconto,
    req.body.data_venda,
    req.body.produtoID,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Vendas criado com sucesso.");
  });
};





export const updateVendas = (req, res) => {
  console.log("updateVendas");
  const q =
    "UPDATE vendas SET `idvendas` = ?, `usuario_id` = ?, `total` = ?, `desconto` = ?, `data_venda` = ?, `produtoID` = ? WHERE `idvendas` = ?";

  const values = [
    req.body.usuario_id,
    req.body.total,
    req.body.desconto,
    req.body.data_venda,
    req.body.produtoID,  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Vendas atualizado com sucesso.");
  });
};






export const deleteVendas = (req, res) => {
  console.log("deleteVendas");
  const q = "DELETE FROM vendas WHERE `idvendas` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Vendas deletado com sucesso.");
  });
};